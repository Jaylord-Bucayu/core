"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateStudentId = void 0;
function generateStudentId() {
    const minId = 1000;
    const maxId = 9999;
    const randomId = Math.floor(Math.random() * (maxId - minId + 1)) + minId;
    return randomId.toString();
}
exports.generateStudentId = generateStudentId;
//# sourceMappingURL=index.js.map