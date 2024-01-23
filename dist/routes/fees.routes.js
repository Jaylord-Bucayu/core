"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeesRoute = void 0;
const fees_controller_1 = require("../controllers/fees.controller");
function FeesRoute(app) {
    app.get("/fees", fees_controller_1.getFeesList);
    app.get("/fees/:id", fees_controller_1.getFeesById);
    app.post("/fees/create", fees_controller_1.createFee);
}
exports.FeesRoute = FeesRoute;
//# sourceMappingURL=fees.routes.js.map