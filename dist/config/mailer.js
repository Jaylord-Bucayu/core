"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
class Mailer {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: 'alertify.system@gmail.com',
                pass: 'ipckcgpuomxchulh',
            },
        });
    }
    sendMail(to, subject, text) {
        const mailOptions = {
            from: 'alertify.system@gmail.com',
            to,
            subject,
            text,
        };
        return this.transporter.sendMail(mailOptions, (err) => {
            if (err) {
                console.log(err);
                console.log('Error Occurs');
                throw new Error(err.message);
            }
            else {
                console.log(`Email sent successfully`);
            }
        });
    }
}
exports.default = new Mailer();
//# sourceMappingURL=mailer.js.map