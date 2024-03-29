"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteQuery = exports.editQuery = exports.getQuery = exports.getQueryParent = exports.getQueryList = exports.createQuery = void 0;
const query_1 = __importDefault(require("../models/query"));
async function createQuery(req, res) {
    const body = req.body;
    console.log({ body });
    const new_query = new query_1.default(body);
    await new_query.save();
    res.send(new_query);
}
exports.createQuery = createQuery;
async function getQueryList(req, res) {
    const body = req.body;
    const query = await query_1.default.find(body);
    res.send(query);
}
exports.getQueryList = getQueryList;
async function getQueryParent(req, res) {
    try {
        const params = req.params;
        const query = await query_1.default.find({ transaction: params === null || params === void 0 ? void 0 : params.id });
        res.send(query);
    }
    catch (error) {
        console.log(error.message);
        res.send(error);
    }
}
exports.getQueryParent = getQueryParent;
async function getQuery(req, res) {
    const params = req.params;
    const query = await query_1.default.findById(params.id);
    res.send(query);
}
exports.getQuery = getQuery;
async function editQuery(req, res) {
    const params = req.params;
    const body = req.body;
    const query = await query_1.default.findByIdAndUpdate(params.id, body);
    res.send(query);
}
exports.editQuery = editQuery;
async function deleteQuery(req, res) {
    const params = req.params;
    const body = req.body;
    await query_1.default.findByIdAndDelete(params.id, body);
    res.send({ message: "deleted" });
}
exports.deleteQuery = deleteQuery;
//# sourceMappingURL=query.controller.js.map