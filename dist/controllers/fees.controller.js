"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editFee = exports.deleteFee = exports.getStudentFees = exports.createFee = exports.getFeesById = exports.getFeesList = void 0;
const fees_1 = __importDefault(require("../models/fees"));
async function getFeesList(req, res) {
    const data = req.body;
    const payment = await fees_1.default.find(data).populate('student');
    res.send(payment);
}
exports.getFeesList = getFeesList;
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
    const params = req.params;
    const fees = await fees_1.default.find({ student: params.id }).populate('student');
    const totalAmount = fees.reduce((total, fee) => {
        const feeAmount = fee.amount || 0;
        return total + feeAmount;
    }, 0);
    const feesWithTotal = fees.map((fee, index) => (Object.assign(Object.assign({}, fee.toObject()), { totalAmount: index === fees.length - 1 ? totalAmount : undefined })));
    res.send(feesWithTotal);
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
    const params = req.params;
    const body = req.body;
    const query = await fees_1.default.findByIdAndUpdate(params.id, body);
    res.send(query);
}
exports.editFee = editFee;
//# sourceMappingURL=fees.controller.js.map