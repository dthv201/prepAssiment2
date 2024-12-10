const postModel = require("../models/posts_model");

const getPostById = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await postModel.findById(postId);
    res.status(200).send(post);
  } catch (error) {
    res.status(400).send(error);
  }
};

const createPost = async (req, res) => {
  const newPost = new postModel(req.body);

  try {
    const savedPost = await newPost.save();
    res.status(201).send(savedPost);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllPosts = async (req, res) => {
  const filter = req.query.sender;
  
  try {
    if (filter) {
      const posts = await postModel.find({ sender: filter });
      res.send(posts);
    } else {
      const posts = await postModel.find();
      res.send(posts);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
// const deletePostById = async (req, res) => {
//  const postId = req.params.id;
//   try {
//    await postModel.findByIdAndDelete(postId);
//     res.status(200).send("Post deleted successfully");
//   } catch (error) {
//     res.status(404).send(error);
//   }
// };
const deletePostById = async (req, res) => {
  const postId = req.params.id;
  console.log(`Attempting to delete post with ID: ${postId}`);

  try {
    const post = await postModel.findById(postId);
    if (!post) {
      console.log(`Post with ID: ${postId} not found`);
      return res.status(404).send({ message: "Post not found" });
    }
    console.log(`Post found: ${post}`);
    const deletedPost = await postModel.findByIdAndDelete(postId);
    console.log(`Deleted post: ${deletedPost}`);
    res.status(200).send({ message: "Post deleted successfully" });
  } catch (error) {
    console.log(`Error deleting post with ID: ${postId}`, error);
    res.status(400).send(error);
  }
};


const updatePost = async (req, res) => {
  const postId = req.params.id;
  const updateData = req.body;

  try {
    const updatedPost = await postModel.findByIdAndUpdate(postId, updateData, { new: true });
    res.status(200).send(updatedPost);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { 
  getPostById, 
  createPost, 
  getAllPosts, 
  deletePostById,
  updatePost,
   
};
