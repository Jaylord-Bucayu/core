"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsRoute = void 0;
const payments_controller_1 = require("../controllers/payments.controller");
function PaymentsRoute(app) {
    app.get("/payments", payments_controller_1.getPaymentsList);
    app.get("/payments/:id", payments_controller_1.getPaymentsById);
}
exports.PaymentsRoute = PaymentsRoute;
//# sourceMappingURL=payments.routes.js.map