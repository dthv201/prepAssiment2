import mongoose from "mongoose";

export interface iComment {
  comment: String,
  postId: String,
  sender: String,
}

const commentsSchema = new mongoose.Schema<iComment>({
  comment: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
});

const commentsModel = mongoose.model<iComment>("comments", commentsSchema);

export default commentsModel;