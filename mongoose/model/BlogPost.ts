import { Schema, model } from "mongoose";

export interface BlogPost {
    id: string;
    title: string;
    description: string;
    content: string;
    imgPath: string;
    date: number;
}

export const BlogPostSchema = new Schema<BlogPost>({
    id: { type: String, required: true, unique: true},
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    imagePath: String,
    date: { type: Number, required: true }
})