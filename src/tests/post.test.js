const request = require("supertest");
const app = require("../../server");
const mongoose = require("mongoose");
const postModel = require("../models/posts_model");

const testPost = [
  { 
    title: "Test title",
    content: "Test content",
    sender: "Eliav" 
  },
  {
    title: "Test title 2",
    content: "Test content 2",
    sender: "Eliav 2"
  }
];

beforeAll(async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    await postModel.deleteMany();
    console.log("Deleted all posts");
  } catch (error) {
    console.error("Error in beforeAll hook:", error);
  }
}, 30000); 

afterAll(async () => {
  try {
    await mongoose.connection.close();
    console.log("Closed MongoDB connection");
  } catch (error) {
    console.error("Error in afterAll hook:", error);
  }
}, 30000); 

describe("Post API tests", () => {
  test("Test get all posts empty", async () => {
    const response = await request(app).get("/posts");
    console.log("Get all posts response:", response.body);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(0);
  });

  test("Test create new post", async () => {
    for (let post of testPost) {
      const response = await request(app)
        .post("/posts")
        .send(post);
      console.log("Create post response:", response.body);
      expect(response.statusCode).toBe(201);
      expect(response.body.title).toBe(post.title);
      expect(response.body.content).toBe(post.content);
      expect(response.body.sender).toBe(post.sender);
      post._id = response.body._id;
    }
  });

  test("Test get all posts", async () => {
    const response = await request(app).get("/posts");
    console.log("Get all posts response:", response.body);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(testPost.length);
  });

  test("Test get post by id", async () => {
    const response = await request(app).get(`/posts/${testPost[0]._id}`);
    console.log("Get post by ID response:", response.body);
    expect(response.statusCode).toBe(200);
    expect(response.body._id).toBe(testPost[0]._id.toString());
  });

  test("Test filter by sender", async () => {
    const response = await request(app).get(`/posts?sender=${testPost[0].sender}`);
    console.log("Filter by sender response:", response.body);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
  });

  test("Test delete post", async () => {
    console.log("Deleting post with ID:", testPost[0]._id);
    const response = await request(app).delete(`/posts/${testPost[0]._id}`);
    console.log("Delete response:", response.body);
    expect(response.statusCode).toBe(200);

    const response2 = await request(app).get(`/posts/${testPost[0]._id}`);
    console.log("Get post after delete response:", response2.body);
    expect(response2.statusCode).toBe(404);
  });
});
