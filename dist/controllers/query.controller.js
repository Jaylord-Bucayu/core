"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editQuery = exports.getQuery = exports.getQueryList = exports.createQuery = void 0;
const query_1 = __importDefault(require("../models/query"));
async function createQuery(req, res) {
    const body = req.body;
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
//# sourceMappingURL=query.controller.js.map