"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeesRoute = void 0;
const fees_controller_1 = require("../controllers/fees.controller");
const auth_1 = __importDefault(require("../middleware/auth"));
function FeesRoute(app) {
    app.get("/fees", auth_1.default, fees_controller_1.getFeesList);
    app.get("/fees/:id", fees_controller_1.getFeesById);
    app.post("/fees/create", fees_controller_1.createFee);
}
exports.FeesRoute = FeesRoute;
//# sourceMappingURL=fees.routes.js.map