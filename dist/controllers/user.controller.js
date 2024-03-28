"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudent = exports.getParentById = exports.getParentsList = exports.addStudentParticular = exports.getUsersList = exports.editStudent = exports.createStudent = exports.createUser = exports.getStudentById = exports.getStudentsList = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
const auth_1 = __importDefault(require("../models/auth"));
const fees_1 = __importDefault(require("../models/fees"));
const index_1 = require("../utils/index");
async function getStudentsList(_, res) {
    const users = await auth_1.default.find({ 'role': 'student' }).populate('user');
    res.send(users);
}
exports.getStudentsList = getStudentsList;
async function getStudentById(req, res) {
    const params = req.params;
    const user = await auth_1.default.findById(params.id).populate('user');
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
            role: 'student',
            password: bcrypt_1.default.hashSync((0, index_1.formatDate)(data.password), 10),
        });
        await auth.save();
        const user = new user_1.default({
            _id: auth.id,
            firstname: data.firstname,
            middlename: data.middlename,
            lastname: data.lastname
        });
        await user.save();
        const parent_auth = new auth_1.default({
            email: data.parent.email,
            mobile: data.parent.mobile,
            role: 'parent',
            password: bcrypt_1.default.hashSync(data.parent.email, 10),
        });
        await parent_auth.save();
        const parent_user = new user_1.default({
            _id: auth.id,
            firstname: data.parent.firstname,
            middlename: data.parent.middlename,
            lastname: data.parent.lastname
        });
        await parent_user.save();
        res.send('user created');
    }
    catch (error) {
        return res.send(error);
    }
}
exports.createUser = createUser;
async function createStudent(req, res) {
    const data = req.body;
    try {
        const auth = new auth_1.default({
            email: data.email,
            username: data.username,
            mobile: data.mobile,
            role: 'student',
            password: bcrypt_1.default.hashSync((0, index_1.formatDate)(data.birthdate), 10),
        });
        await auth.save();
        const user = new user_1.default({
            _id: auth.id,
            firstname: data.firstname,
            middlename: data.middlename,
            lastname: data.lastname,
            birthdate: data.birthdate,
            gender: data.gender,
            section: data.section,
            studentId: data.studentId
        });
        await user.save();
        const parent_auth = new auth_1.default({
            email: data.parent.email,
            mobile: data.parent.mobile,
            role: 'parent',
            password: bcrypt_1.default.hashSync(data.parent.email, 10),
        });
        await parent_auth.save();
        const parent_user = new user_1.default({
            _id: parent_auth.id,
            firstname: data.parent.firstname,
            middlename: data.parent.middlename,
            lastname: data.parent.lastname
        });
        await parent_user.save();
        user.parent = parent_auth.id;
        await user.save();
        console.log("sad");
        res.send('user created');
    }
    catch (error) {
        return res.send(error);
    }
}
exports.createStudent = createStudent;
async function editStudent(req, res) {
    const data = req.body;
    const params = req.params;
    console.log({ data, params });
    await user_1.default.findByIdAndUpdate(params.id, {
        $set: Object.assign({}, data),
    }, { upsert: true });
    const auth = await auth_1.default.findById(req.body.id);
    if (auth) {
        auth.mobile = data.mobile || '';
        auth.email = data.email || '';
        auth.save();
    }
    res.send('Profiled updated successfully');
}
exports.editStudent = editStudent;
async function getUsersList(_, res) {
    const users = await user_1.default.find();
    res.send(users);
}
exports.getUsersList = getUsersList;
async function addStudentParticular(req, res) {
    const params = req.params;
    const data = req.body;
    const addedFee = new fees_1.default(data);
    addedFee.student = params.id;
    await addedFee.save();
    res.send('fee added');
}
exports.addStudentParticular = addStudentParticular;
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
async function deleteStudent(req, res) {
    const params = req.params;
    await auth_1.default.findByIdAndDelete(params.id);
    await user_1.default.findByIdAndDelete(params.id);
    res.send({ message: "Deleted User" });
}
exports.deleteStudent = deleteStudent;
//# sourceMappingURL=user.controller.js.map