"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSectionParticular = exports.createSection = exports.editSection = exports.getSection = exports.getSectionsList = void 0;
const section_1 = __importDefault(require("../models/section"));
const user_1 = __importDefault(require("../models/user"));
const fees_1 = __importDefault(require("../models/fees"));
async function getSectionsList(req, res) {
    const data = req.body;
    const sections = await section_1.default.find(data);
    res.send(sections);
}
exports.getSectionsList = getSectionsList;
async function getSection(req, res) {
    const params = req.params;
    const sections = await section_1.default.findById(params.id);
    res.send(sections);
}
exports.getSection = getSection;
async function editSection(req, res) {
    const data = req.body;
    const params = req.params;
    const sections = await section_1.default.findByIdAndUpdate(params.id, {
        $set: Object.assign({}, data),
    }, { upsert: true });
    res.send(sections);
}
exports.editSection = editSection;
async function createSection(req, res) {
    const data = req.body;
    const sections = new section_1.default(data);
    await sections.save();
    res.send(sections);
}
exports.createSection = createSection;
async function addSectionParticular(req, res) {
    const params = req.params;
    const body = req.body;
    const section = await section_1.default.findById(params.id);
    if (section) {
        const students = await user_1.default.find({ section: section.section_name });
        for (const student of students) {
            const fee = new fees_1.default({
                amount: body.amount,
                particulars: body.particulars,
                student: student.id,
            });
            await fee.save();
        }
        res.send('fee added');
    }
}
exports.addSectionParticular = addSectionParticular;
//# sourceMappingURL=section.controller.js.map