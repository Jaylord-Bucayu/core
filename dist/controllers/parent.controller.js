"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStudentClearanceList = void 0;
const fees_1 = __importDefault(require("../models/fees"));
const user_1 = __importDefault(require("../models/user"));
async function getStudentClearanceList(req, res) {
    const params = req.params;
    const student = await user_1.default.findOne({ parent: params.id });
    if (student) {
        await fees_1.default.find({ student: student.id });
        return res.send('added');
    }
    res.send('empty');
}
exports.getStudentClearanceList = getStudentClearanceList;
//# sourceMappingURL=parent.controller.js.map