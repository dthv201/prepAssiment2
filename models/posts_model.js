const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

module.exports = mongoose.model("Post", postSchema);

//module.exports = mongoose.model("Post", postSchema);
