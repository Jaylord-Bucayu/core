"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = exports.generateStudentId = void 0;
function generateStudentId() {
    const minId = 1000;
    const maxId = 9999;
    const randomId = Math.floor(Math.random() * (maxId - minId + 1)) + minId;
    return randomId.toString();
}
exports.generateStudentId = generateStudentId;
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
}
exports.formatDate = formatDate;
//# sourceMappingURL=index.js.map