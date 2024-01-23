"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRoute = void 0;
const user_controller_1 = require("../controllers/user.controller");
const fees_controller_1 = require("../controllers/fees.controller");
function UsersRoute(app) {
    app.get("/users", user_controller_1.getUsersList);
    app.get("/users/show/:id", user_controller_1.getStudentById);
    app.post("/students/create", user_controller_1.createStudent);
    app.get("/students", user_controller_1.getStudentsList);
    app.get("/students/:id", user_controller_1.getStudentById);
    app.patch("/students/:id", user_controller_1.editStudent);
    app.get("/students/fees/:id", fees_controller_1.getStudentFees);
    app.post('/students/particulars/create/:id', user_controller_1.addStudentParticular);
}
exports.UsersRoute = UsersRoute;
//# sourceMappingURL=user.routes.js.map