"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryRoutes = void 0;
const query_controller_1 = require("../controllers/query.controller");
function queryRoutes(app) {
    app.post("/query", query_controller_1.createQuery);
    app.get("/query", query_controller_1.getQueryList);
    app.get("/query/:id", query_controller_1.getQuery);
    app.get("/query/parent/:id", query_controller_1.getQueryParent);
    app.patch("/query/:id", query_controller_1.editQuery);
    app.delete("/query/:id", query_controller_1.deleteQuery);
}
exports.queryRoutes = queryRoutes;
//# sourceMappingURL=query.routes.js.map