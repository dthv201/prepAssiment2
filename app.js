const express = require("express");
const mongoose = require("mongoose");
const postsRoute = require("./routes/posts_route");
const commentsRoute = require("./routes/comments_route");
require("dotenv").config();

const app = express();
const uri = process.env.DB_CONNECTION;

// Middleware to parse JSON bodies
app.use(express.json());

// Use the posts route
app.use("/posts", postsRoute);

// Use the comments route
app.use("/comments", commentsRoute);

// Connect to MongoDB
mongoose.connect(uri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});