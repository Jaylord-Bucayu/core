"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeesRoute = void 0;
const fees_controller_1 = require("../controllers/fees.controller");
function FeesRoute(app) {
    app.get("/fees", fees_controller_1.getFeesList);
    app.get("/fees/:id", fees_controller_1.getFeesById);
    app.get("/fees/student/:id", fees_controller_1.getFeesListStudent);
    app.post("/fees/create", fees_controller_1.createFee);
    app.delete("/fees/:id", fees_controller_1.deleteFee);
    app.patch("/fees/:id", fees_controller_1.editFee);
}
exports.FeesRoute = FeesRoute;
//# sourceMappingURL=fees.routes.js.map