"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = __importDefault(require("../models/auth"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const APP_KEY = process.env.APP_KEY || '';
const middleware = async (req, res, next) => {
    try {
        let token;
        if (req.cookies.jwt) {
            token = req.cookies.jwt;
        }
        else {
            token = (req.header('Authorization') || '').replace('Bearer ', '');
        }
        if (!token) {
            throw new Error('Access denied. No token provided.');
        }
        const data = jsonwebtoken_1.default.verify(token, APP_KEY);
        const auth = await auth_1.default.findById(data.auth);
        if (!auth) {
            return res.status(401).send('Session expired.');
        }
        auth.lastActive = new Date();
        await auth.save();
        next();
    }
    catch (err) {
        return res.status(401).send('Access denied. Invalid token.');
    }
};
exports.default = middleware;
//# sourceMappingURL=auth.js.map