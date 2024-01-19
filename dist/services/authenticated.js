"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
async function isAuthenticated(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).send({
            message: "Unauthorized: No auth headers",
        });
    }
    if (!authorization.startsWith("Bearer")) {
        return res.status(401).send({
            message: "Unauthorized: No bearer in header",
        });
    }
    const split = authorization.split("Bearer ");
    if (split.length !== 2) {
        return res.status(401).send({
            message: "Unauthorized: Bearer length too short",
        });
    }
    try {
        return next();
    }
    catch (err) {
        console.error(`${err.code} -  ${err.message}`);
        return res.status(401).send({
            message: "Unauthorized", code: err.code,
        });
    }
}
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=authenticated.js.map