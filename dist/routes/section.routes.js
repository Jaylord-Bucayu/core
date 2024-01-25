"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionRoute = void 0;
const section_controller_1 = require("../controllers/section.controller");
function SectionRoute(app) {
    app.get("/sections", section_controller_1.getSectionsList);
    app.get("/sections/:id", section_controller_1.getSection);
    app.patch("/sections/:id", section_controller_1.editSection);
    app.post("/sections/create", section_controller_1.createSection);
    app.post('/sections/particular/create/:id', section_controller_1.addSectionParticular);
}
exports.SectionRoute = SectionRoute;
//# sourceMappingURL=section.routes.js.map