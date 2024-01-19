"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRoute = void 0;
const user_controller_1 = require("../controllers/user.controller");
function UsersRoute(app) {
    app.get("/users", user_controller_1.getUsersList);
    app.get("/users/show/:id", user_controller_1.getStudentById);
    app.post("/users/create", user_controller_1.createUser);
    app.get("/students", user_controller_1.getStudentsList);
    app.get("/students/:id", user_controller_1.getStudentById);
}
exports.UsersRoute = UsersRoute;
//# sourceMappingURL=user.routes.js.map