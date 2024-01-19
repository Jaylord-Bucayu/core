"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParentById = exports.getParentsList = exports.getUsersList = exports.createUser = exports.getStudentById = exports.getStudentsList = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
const auth_1 = __importDefault(require("../models/auth"));
async function getStudentsList(_, res) {
    const users = await auth_1.default.find({ 'role': 'student' }).populate({
        path: 'user',
        select: 'email mobile fullname data.email data.mobile data.fullname'
    });
    res.send(users);
}
exports.getStudentsList = getStudentsList;
async function getStudentById(req, res) {
    const params = req.params;
    const user = await auth_1.default.findById(params.id).populate('user');
    console.log(user);
    res.send(user);
}
exports.getStudentById = getStudentById;
async function createUser(req, res) {
    const data = req.body;
    try {
        const auth = new auth_1.default({
            email: data.email,
            username: data.username,
            mobile: data.mobile,
            role: data.role,
            password: bcrypt_1.default.hashSync(data.password, 10),
        });
        await auth.save();
        const user = new user_1.default({
            _id: auth.id,
            firstname: data.firstname,
            middlename: data.middlename,
            lastname: data.lastname,
            parent: data.parent
        });
        await user.save();
        return res.send('user created');
    }
    catch (error) {
        return res.send(error);
    }
}
exports.createUser = createUser;
async function getUsersList(_, res) {
    const users = await user_1.default.find();
    res.send(users);
}
exports.getUsersList = getUsersList;
async function getParentsList(_, res) {
    const data = [
        {
            "id": 1,
            "title": "Spanish"
        },
        {
            "id": 2,
            "title": "English"
        },
        {
            "id": 3,
            "title": "German"
        }
    ];
    res.send(data);
}
exports.getParentsList = getParentsList;
async function getParentById(_, res) {
    const data = {
        "id": 1,
        "title": "Spanish"
    };
    res.send(data);
}
exports.getParentById = getParentById;
//# sourceMappingURL=user.controller.js.map