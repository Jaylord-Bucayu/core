"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dbUri = process.env.APP_MONGODB_URI;
async function initializeMongoose() {
    if (!dbUri) {
        console.error('MongoDB URI is not defined in the environment variables.');
        return;
    }
    try {
        await mongoose_1.default.connect(dbUri);
        console.log(`MongoDB connected to: ${process.env.APP_MONGODB_URI}`);
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}
exports.default = initializeMongoose;
//# sourceMappingURL=mongoose.js.map