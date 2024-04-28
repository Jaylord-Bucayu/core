"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editFee = exports.deleteFee = exports.getStudentFees = exports.createFee = exports.getFeesById = exports.getFeesListStudent = exports.getFeesList = void 0;
const fees_1 = __importDefault(require("../models/fees"));
const user_1 = __importDefault(require("../models/user"));
const mailer_1 = __importDefault(require("src/config/mailer"));
async function getFeesList(req, res) {
    const data = req.body;
    const payment = await fees_1.default.find(data).populate('student');
    res.send(payment);
}
exports.getFeesList = getFeesList;
async function getFeesListStudent(req, res) {
    try {
        const params = req.params;
        const payment = await fees_1.default.find({ student: params.id }).populate('student');
        res.send(payment);
    }
    catch (error) {
        res.status(500).send(error);
    }
}
exports.getFeesListStudent = getFeesListStudent;
async function getFeesById(req, res) {
    const params = req.params;
    const fees = await fees_1.default.findById(params.id);
    res.send(fees);
}
exports.getFeesById = getFeesById;
async function createFee(req, res) {
    const data = req.body;
    const fees = new fees_1.default(data);
    await fees.save();
    res.send(fees);
}
exports.createFee = createFee;
async function getStudentFees(req, res) {
    try {
        const params = req.params;
        const parent = await user_1.default.findById(params.id);
        const fees = await fees_1.default.find({ student: parent === null || parent === void 0 ? void 0 : parent.child }).populate('student');
        console.log(fees);
        if (!fees) {
            return res.send([]);
        }
        const totalAmount = fees.reduce((total, fee) => {
            const feeAmount = fee.amount || 0;
            return total + feeAmount;
        }, 0);
        const feesWithTotal = fees.map((fee, index) => (Object.assign(Object.assign({}, fee.toObject()), { totalAmount: index === fees.length - 1 ? totalAmount : undefined })));
        res.send(feesWithTotal);
    }
    catch (error) {
        res.status(500).send(error);
    }
}
exports.getStudentFees = getStudentFees;
async function deleteFee(req, res) {
    const params = req.params;
    const body = req.body;
    await fees_1.default.findByIdAndDelete(params.id, body);
    res.send({ message: "deleted" });
}
exports.deleteFee = deleteFee;
async function editFee(req, res) {
    var _a;
    const params = req.params;
    const body = req.body;
    const query = await fees_1.default.findByIdAndUpdate(params.id, body).populate('student');
    const student = await user_1.default.findById(query === null || query === void 0 ? void 0 : query.id).populate('parent');
    if (body.status === 'success' && student) {
        const parentEmail = ((_a = student.parent) === null || _a === void 0 ? void 0 : _a.email) || '';
        const studentEmail = student.email || '';
        mailer_1.default.sendMail(parentEmail, 'Portal Account Fee', `The Payment of your children, for ${query === null || query === void 0 ? void 0 : query.particulars} with amounting ${query === null || query === void 0 ? void 0 : query.amount} has been paid`);
        mailer_1.default.sendMail(studentEmail, 'Portal Account Fee', `The payment for ${query === null || query === void 0 ? void 0 : query.particulars} with amounting ${query === null || query === void 0 ? void 0 : query.amount} has been paid`);
    }
    res.send(query);
}
exports.editFee = editFee;
//# sourceMappingURL=fees.controller.js.map