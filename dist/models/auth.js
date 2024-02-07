"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const authSchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
        unique: true,
        trim: true,
        sparse: true,
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        sparse: true,
    },
    mobile: {
        type: String,
        of: String,
        trim: true,
        unique: true,
        sparse: true,
        required: false,
    },
    username: {
        type: String,
        unique: true,
        trim: true,
        sparse: true,
    },
    usernameChangedAt: Date,
    password: {
        type: String,
        required: true,
        select: false,
        trim: true,
    },
    role: {
        type: String,
        default: 'admin',
        enum: ['superadmin', 'admin', 'parent', 'student']
    },
    permissions: {
        type: Array,
        default: [],
    },
    lastActive: {
        type: Date,
        default: null,
    },
    deletedAt: {
        type: Date,
        default: null,
    },
}, { timestamps: true });
authSchema.virtual('id').get(function () {
    var _a;
    return (_a = this._id) === null || _a === void 0 ? void 0 : _a.toHexString();
});
authSchema.set('toJSON', {
    virtuals: true,
    transform: function (_doc, ret) {
        const newRet = { id: ret._id };
        delete ret._id;
        delete ret.__v;
        Object.assign(newRet, ret);
        return newRet;
    }
});
authSchema.virtual('user', {
    ref: 'User',
    localField: '_id',
    foreignField: '_id',
    justOne: true
});
authSchema.pre('save', function (next) {
    const data = this.toJSON();
    this.mobile = data.mobile;
    if (this.username)
        this.username = this.username.toLowerCase();
    next();
});
const AuthModel = mongoose_1.default.model('Auth', authSchema);
exports.default = AuthModel;
//# sourceMappingURL=auth.js.map