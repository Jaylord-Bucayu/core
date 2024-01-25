"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const auth_controller_1 = require("../controllers/auth.controller");
function authRoutes(app) {
    app.post("/login", auth_controller_1.signUserInWithEmailPassword);
}
exports.authRoutes = authRoutes;
//# sourceMappingURL=auth.routes.js.map