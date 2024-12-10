import mongoose from "mongoose";
const Schema = mongoose.Schema;

export interface iPost {
  title: String,
  content: String,
  sender: String,
}


const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: String,
  sender: {
    type: String,
    required: true,
  },
});

const postModel = mongoose.model<iPost>("posts", postSchema);

export default postModel;
