"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const paymentSchema = new mongoose_1.Schema({
    amount: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'paid', 'failed']
    },
    fee: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'Fee'
    },
    student: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'User'
    },
    parent: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'User'
    },
}, { timestamps: true });
paymentSchema.index({ sponsors: 1 });
paymentSchema.index({ sponsorId: 1 });
paymentSchema.virtual('id').get(function () {
    var _a;
    return (_a = this._id) === null || _a === void 0 ? void 0 : _a.toHexString();
});
paymentSchema.set('toJSON', {
    virtuals: true,
    transform: function (_, ret) {
        const newRet = { id: ret._id };
        delete ret._id;
        delete ret.__v;
        Object.assign(newRet, ret);
        return newRet;
    }
});
paymentSchema.post('save', async () => {
});
const PaymentModel = mongoose_1.default.model('Payment', paymentSchema);
exports.default = PaymentModel;
//# sourceMappingURL=payment.js.map