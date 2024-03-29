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
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        default: '',
    },
    firstname: {
        type: String,
        default: "",
    },
    middlename: {
        type: String,
        default: "",
    },
    lastname: {
        type: String,
        default: "",
    },
    gender: {
        type: String,
        default: "",
    },
    studentId: {
        type: String,
        default: "",
    },
    birthdate: {
        type: Date,
        default: null,
    },
    avatar: {
        type: String,
        default: null,
    },
    userTypes: [{
            type: String,
        }],
    bio: {
        type: String,
        default: null,
    },
    section: {
        type: String,
    },
    data: {
        type: Map,
        default: {}
    },
    parent: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'User'
    },
}, { timestamps: true });
userSchema.index({ sponsors: 1 });
userSchema.index({ sponsorId: 1 });
userSchema.virtual('id').get(function () {
    var _a;
    return (_a = this._id) === null || _a === void 0 ? void 0 : _a.toHexString();
});
userSchema.virtual('fullname').get(function () {
    if (this.firstname)
        return `${this.firstname} ${this.lastname}`;
    return undefined;
});
userSchema.set('toJSON', {
    virtuals: true,
    transform: function (_, ret) {
        const newRet = { id: ret._id };
        delete ret._id;
        delete ret.__v;
        Object.assign(newRet, ret);
        return newRet;
    }
});
userSchema.post('save', async () => {
});
const UserModel = mongoose_1.default.model('User', userSchema);
exports.default = UserModel;
//# sourceMappingURL=user.js.map