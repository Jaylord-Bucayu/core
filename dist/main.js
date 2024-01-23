"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const auth_routes_1 = require("./routes/auth.routes");
const payments_routes_1 = require("./routes/payments.routes");
const user_routes_1 = require("./routes/user.routes");
const section_routes_1 = require("./routes/section.routes");
const fees_routes_1 = require("./routes/fees.routes");
const mongoose_1 = __importDefault(require("./config/mongoose"));
const app = (0, express_1.default)();
const port = 5000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
(0, mongoose_1.default)();
(0, auth_routes_1.authRoutes)(app);
(0, payments_routes_1.PaymentsRoute)(app);
(0, user_routes_1.UsersRoute)(app);
(0, section_routes_1.SectionRoute)(app);
(0, fees_routes_1.FeesRoute)(app);
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
//# sourceMappingURL=main.js.map