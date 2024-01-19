"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaymentsById = exports.getPaymentsList = void 0;
async function getPaymentsList(_, res) {
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
exports.getPaymentsList = getPaymentsList;
async function getPaymentsById(_, res) {
    const data = {
        "id": 1,
        "title": "Spanish"
    };
    res.send(data);
}
exports.getPaymentsById = getPaymentsById;
//# sourceMappingURL=payments.controller.js.map