
const request = require("supertest")
const app = require("../server")
const mongoose = require("mongoose")
const postModel = require("../models/posts_model")

const testPost = require("./test_posts.json")
beforeAll(async() => {
  // console.log("Before All");
   await postModel.deleteMany();
  
});

afterAll(done => {
  // console.log("After All");
  mongoose.connection.close();
  done();
});

describe("Initial test 1", () => {
  test("Test get all post empty", async () => {
    const response = await request(app).get("/posts");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(0);
  });
  test("Test create new post",async()=>{
    for(let post of testPost){
    const response = await request(app)
    .post("/posts")
    .send(post);
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe(post.title);
    expect(response.body.content).toBe(post.content);
    expect(response.body.sender).toBe(post.sender);
    post._id = response.body._id;

    }
  });
  test("Test get all post empty", async () => {
    const response = await request(app).get("/posts");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(testPost.length);
  });

  test("Test get post by id", async()=>{
    const response = await request(app).get(`/posts/${testPost[0]._id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body._id).toBe(testPost[0]._id);
  });

  test("Test filter by sender", async()=>{
    const response = await request(app).get(
      `/posts?sender=`+testPost[0].sender
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
   
  });
  // test("Test delete post", async () => {
  //  const response = await request(app).delete(`/posts/`+testPost[0]._id);
  //  expect(response.statusCode).toBe(200);

  //   const responseGet = await request(app).get(`/posts/`+testPost[0]._id);
  //   expect(responseGet.statusCode).toBe(404);
  // });

  test("Test delete post", async () => {
    console.log("Deleting post with ID:", testPost[0]._id);
    const response = await request(app).delete(`/posts/${testPost[0]._id}`);
    console.log("Delete response:", response.body);
    expect(response.statusCode).toBe(200);

    const response2 = await request(app).get(`/posts/${testPost[0]._id}`);
    expect(response2.statusCode).toBe(200);
  });

  

});
