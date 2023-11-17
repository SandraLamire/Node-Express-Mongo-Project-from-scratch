import { Schema, model } from "mongoose";
import Post from '@/ressources/post/post.interface';

const PostSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        },
    },
    // Horodatages
    { timestamps: true}
);

export default model<Post>('Post', PostSchema);
