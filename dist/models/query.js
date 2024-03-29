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
const querySchema = new mongoose_1.Schema({
    amount: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'paid', 'failed']
    },
    description: {
        type: String,
        default: '',
    },
    subject: {
        type: String,
        default: '',
    },
    transaction: {
        type: String,
        default: 'User',
    }
}, { timestamps: true });
querySchema.index({ sponsors: 1 });
querySchema.index({ sponsorId: 1 });
querySchema.virtual('id').get(function () {
    var _a;
    return (_a = this._id) === null || _a === void 0 ? void 0 : _a.toHexString();
});
querySchema.set('toJSON', {
    virtuals: true,
    transform: function (_, ret) {
        const newRet = { id: ret._id };
        delete ret._id;
        delete ret.__v;
        Object.assign(newRet, ret);
        return newRet;
    }
});
querySchema.post('save', async () => {
});
const QueryModel = mongoose_1.default.model('Query', querySchema);
exports.default = QueryModel;
//# sourceMappingURL=query.js.map