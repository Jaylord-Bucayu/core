"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUserInWithEmailPassword = exports.currentUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const auth_1 = __importDefault(require("../models/auth"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function decodeJWT(token) {
    if (!token) {
        throw new Error('Token is missing');
    }
    const parts = token.split('.');
    if (parts.length !== 3) {
        throw new Error('Invalid JWT format');
    }
    try {
        const decodedPayload = atob(parts[1]);
        return JSON.parse(decodedPayload);
    }
    catch (error) {
        throw new Error('Error decoding JWT');
    }
}
async function currentUser(req, res) {
    try {
        let token;
        const authHeader = req.headers['authorization'];
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7);
        }
        if (typeof token === 'string') {
            const auth = decodeJWT(token);
            const user = await user_1.default.findByIdAndUpdate(auth.auth, {}, { new: true, upsert: true });
            res.send({
                'status': 'success',
                'message': 'Query success',
                'data': Object.assign({}, user.toJSON())
            });
        }
        else {
            throw new Error('Token is missing');
        }
    }
    catch (error) {
        res.status(400).send({
            'status': 'error',
            'message': error.message,
        });
    }
}
exports.currentUser = currentUser;
async function signUserInWithEmailPassword(req, res) {
    try {
        const appKey = process.env.APP_KEY;
        if (!appKey) {
            throw new Error('APP_KEY environment variable is not defined');
        }
        const data = req.body;
        if (data.username !== undefined && data.username !== null) {
            data.username = data.username.toLowerCase();
        }
        if (data.email !== undefined && data.email !== null) {
            data.email = data.email.toLowerCase();
        }
        let auth = null;
        if (data.email != null) {
            auth = await auth_1.default.findOne({ email: data.email }).select('+password');
        }
        else if (data.username != null) {
            auth = await auth_1.default.findOne({
                username: data.username.toString().toLowerCase(),
            }).select('+password');
        }
        else if (data.mobile != null) {
            auth = await auth_1.default.findOne({
                'mobile.cc': data.country_code.toString(),
                'mobile.m': data.mobile.toString(),
            }).select('+password');
        }
        else {
            return res.send('You must login with either email, mobile number, or username.');
        }
        if (auth == null) {
            return res.send('We can\'t find an account associated with this credential.');
        }
        if (!await bcrypt_1.default.compare(data.password, auth.password)) {
            return res.send('Credentials are incorrect.');
        }
        const token = jsonwebtoken_1.default.sign({ auth: auth.id.toString() }, appKey, {
            expiresIn: '30d',
        });
        res.cookie('jwt', token, {
            secure: process.env.APP_ENV !== 'development',
            httpOnly: true,
            sameSite: 'strict',
        });
        auth.lastActive = new Date();
        await auth.save();
        auth = auth.toJSON();
        await user_1.default.findByIdAndUpdate(auth.id, {}, { new: true, upsert: true });
        res.send({
            'status': 'success',
            'message': 'Login successfully',
            'data': auth,
            'token': token,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
    }
}
exports.signUserInWithEmailPassword = signUserInWithEmailPassword;
//# sourceMappingURL=auth.controller.js.map