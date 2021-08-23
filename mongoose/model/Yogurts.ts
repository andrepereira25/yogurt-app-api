import { Schema } from "mongoose";

export interface Yogurt {
    id: string;
    flavour: string;
    content: string;
    imgPath: string;
}

export const YogurtSchema = new Schema<Yogurt>({
    id: { type: String, required: true, unique: true},
    flavour: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    imgPath: { type: String, required: true },
})