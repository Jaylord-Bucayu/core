"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPayment = exports.getPaymentsById = exports.getPaymentsList = void 0;
const payment_1 = __importDefault(require("../models/payment"));
async function getPaymentsList(req, res) {
    const data = req.body;
    const payment = await payment_1.default.find(data);
    res.send(payment);
}
exports.getPaymentsList = getPaymentsList;
async function getPaymentsById(req, res) {
    const params = req.params;
    const payment = await payment_1.default.findById(params.id);
    res.send(payment);
}
exports.getPaymentsById = getPaymentsById;
async function createPayment(req, res) {
    const data = req.body;
    const payment = new payment_1.default(data);
    await payment.save();
    res.send(payment);
}
exports.createPayment = createPayment;
//# sourceMappingURL=payments.controller.js.map