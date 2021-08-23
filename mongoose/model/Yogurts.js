"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YogurtSchema = void 0;
const mongoose_1 = require("mongoose");
exports.YogurtSchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    flavour: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    imgPath: { type: String, required: true },
});
