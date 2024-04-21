"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboard = exports.deleteStudent = exports.getParentById = exports.getParentsList = exports.addStudentParticular = exports.getUsersList = exports.editStudent = exports.createStudent = exports.createUser = exports.getStudentById = exports.getStudentsList = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
const auth_1 = __importDefault(require("../models/auth"));
const fees_1 = __importDefault(require("../models/fees"));
const section_1 = __importDefault(require("../models/section"));
const mailer_1 = __importDefault(require("../config/mailer"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = require("../utils/index");
async function getStudentsList(_, res) {
    const users = await auth_1.default.find({ 'role': 'student' }).populate('user');
    res.send(users);
}
exports.getStudentsList = getStudentsList;
async function getStudentById(req, res) {
    const params = req.params;
    const user = await auth_1.default.findById(params.id).populate({
        path: 'user',
        populate: {
            path: 'parent'
        }
    });
    const parent_user = await user_1.default.findById(params.id);
    const parent = await auth_1.default.findById(parent_user === null || parent_user === void 0 ? void 0 : parent_user.parent).populate('user');
    const data = {
        parent,
        user
    };
    res.send(data);
}
exports.getStudentById = getStudentById;
async function createUser(req, res) {
    const data = req.body;
    try {
        const findEmailStudent = await auth_1.default.find({ email: data.email });
        const findEmailParent = await auth_1.default.find({ email: data.parent.email });
        if (findEmailStudent || findEmailParent) {
            return res.status(500).send({ message: "Email for student or parent has already been used by other account" });
        }
        const findPhoneStudent = await auth_1.default.find({ mobile: data.mobile });
        const findPhoneParent = await auth_1.default.find({ mobile: data.parent.mobile });
        if (findPhoneStudent || findPhoneParent) {
            return res.status(500).send({ message: "Phone number for student or parent has already been used by other account" });
        }
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
        return res.send({ message: error.message });
    }
}
exports.createUser = createUser;
async function createStudent(req, res) {
    const data = req.body;
    try {
        const findEmailStudent = await auth_1.default.find({ email: data.email });
        const findEmailParent = await auth_1.default.find({ email: data.parent.email });
        if (findEmailStudent.length != 0 || findEmailParent.length != 0) {
            return res.status(500).send({ message: "Email for student or parent has already been used by other account" });
        }
        if (data.email == data.parent.email) {
            return res.status(500).send({ message: "Email for student and parent must not be the same" });
        }
        if (data.mobile == data.parent.mobile) {
            return res.status(500).send({ message: "Phone number for student and parent must not be the same" });
        }
        const findPhoneStudent = await auth_1.default.find({ mobile: data.mobile });
        const findPhoneParent = await auth_1.default.find({ mobile: data.parent.mobile });
        if (findPhoneStudent.length != 0 || findPhoneParent.length != 0) {
            return res.status(500).send({ message: "Phone number for student or parent has already been used by other account" });
        }
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
            lastname: data.parent.lastname,
            email: data.parent.email
        });
        await parent_user.save();
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
            email: data.email,
            firstname: data.firstname,
            middlename: data.middlename,
            lastname: data.lastname,
            birthdate: data.birthdate,
            gender: data.gender,
            section: data.section,
            studentId: data.studentId,
            parent: new mongoose_1.default.Types.ObjectId(parent_auth.id)
        });
        await user.save();
        parent_user === null || parent_user === void 0 ? void 0 : parent_user.child = new mongoose_1.default.Types.ObjectId(auth.id);
        await parent_user.save();
        mailer_1.default.sendMail(data.email, 'Portal Account credentials', `To check your fees login to the https://client-weld-eight.vercel.app Your password is ${(0, index_1.formatDate)(data.birthdate)} `);
        mailer_1.default.sendMail(data.parent.email, 'Portal Account credentials', `To check your children fees login to the https://client-weld-eight.vercel.app Your password is ${data.parent.email} `);
        res.send('user created');
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Email for student or parent has already been used by other account" });
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
    var _a, _b;
    const params = req.params;
    const data = req.body;
    const addedFee = new fees_1.default(data);
    addedFee.student = params.id;
    await addedFee.save();
    const fee = await fees_1.default.findById(addedFee.id).populate('student');
    const student = await user_1.default.findById(params.id).populate("parent");
    console.log({ fee, student });
    mailer_1.default.sendMail((_a = fee === null || fee === void 0 ? void 0 : fee.student) === null || _a === void 0 ? void 0 : _a.email, 'New Fee added to your account', `A fee for ${addedFee.particulars} amounting ${addedFee.amount} has been added to your account. To verify login to your account`);
    mailer_1.default.sendMail((_b = student === null || student === void 0 ? void 0 : student.parent) === null || _b === void 0 ? void 0 : _b.email, 'New Fee added to your childaccount', `A fee for ${addedFee.particulars} amounting ${addedFee.amount} has been added to your account. To verify login to your account`);
    res.send(fee);
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
    try {
        const params = req.params;
        const user = await user_1.default.findById(params.id);
        await auth_1.default.findByIdAndDelete(params.id);
        await user_1.default.findByIdAndDelete(params.id);
        await auth_1.default.findByIdAndDelete(user === null || user === void 0 ? void 0 : user.parent);
        await user_1.default.findByIdAndDelete(user === null || user === void 0 ? void 0 : user.parent);
        res.send({ message: "Deleted User" });
    }
    catch (error) {
        res.send({ message: error.message });
    }
}
exports.deleteStudent = deleteStudent;
async function dashboard(_, res) {
    const students = await user_1.default.find({});
    const sections = await section_1.default.find({});
    const fees = await fees_1.default.find({ status: "pending" });
    const studentsPerSection = {};
    students.forEach(student => {
        const section = student.section;
        if (section) {
            if (section in studentsPerSection) {
                studentsPerSection[section]++;
            }
            else {
                studentsPerSection[section] = 1;
            }
        }
    });
    const studentsPerSectionArray = Object.keys(studentsPerSection).map(section => ({
        section,
        students: studentsPerSection[section]
    }));
    const data = {
        total_students: students.length,
        total_sections: sections.length,
        total_fees: fees.length,
        students_per_section: studentsPerSectionArray
    };
    res.send(data);
}
exports.dashboard = dashboard;
//# sourceMappingURL=user.controller.js.map