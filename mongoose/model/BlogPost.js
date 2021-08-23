"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogPostSchema = void 0;
const mongoose_1 = require("mongoose");
exports.BlogPostSchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    imgPath: { type: String, required: true },
    date: { type: Number, required: true }
});
