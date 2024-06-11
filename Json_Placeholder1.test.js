const axios = require("axios");

const axiosInstanse = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  timeout: 1000,
  validateStatus: () => true,
});

// Інтерсептори реквестів

axiosInstanse.interceptors.request.use(
  (request) => {
    console.info("Starting Request", {
      url: request.url,
      method: request.method,
      headers: request.headers,
    });
    return request;
  },
  (error) => {
    console.error("Request error", error);
    return Promise.reject(error);
  }
);

// Інтерсептори респонсів
axiosInstanse.interceptors.response.use(
  (response) => {
    console.info("Response:", {
      url: response.config.url,
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.error("Response error", error);
    return Promise.reject(error);
  }
);

//JsonPlasholder API

describe("JsonPlasholder API", () => {

  //test1 - Get users

  test("GET /users status code is 200", async () => {
    const response = await axiosInstanse.get("/users");
    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
  });

  //test2 - Get 2 users

  test("GET 2 /users status code is 200", async () => {
    const response = await axiosInstanse.get("/users?_limit=2");
    expect(response.status).toBe(200);
    const users = Array.from(response.data);
    expect(users.length).toBe(2);
    users.forEach((user) => {
      expect(user.email).not.toBe("");
      expect(user.id).not.toBeNull();
      expect(user.name).not.toBe("");
    });
  });

  //test3 - create new user

  test("Post /users status code is 201", async () => {
    const newUser = {
        "name": "Loran Jo",
        "username": "Gret",
        "email": "Cincere@april.biz"
    }
    const response = await axiosInstanse.post("/users", newUser)
    expect(response.status).toBe(201);
    expect(response.data).toBeDefined();
    expect(response.data.name).toBe(newUser.name);
    expect(response.data.username).toBe(newUser.username);
    expect(response.data.email).toBe(newUser.email);
    console.log(response.data);
  });

  // test4 - Get user with special id

  test("GET /users/:id status code is 200", async () => {
    const userId = 10;
    const response = await axiosInstanse.get(`/users/${userId}`);
    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
    expect(response.data.id).toBe(userId);
  });

  //test5 - Get posts and check all their fields

  test("GET /posts?_limit=5 status code is 200", async () => {
    const response = await axiosInstanse.get("/posts?_limit=5");
    expect(response.status).toBe(200);
    const posts = Array.from(response.data);
    expect(posts.length).toBe(5);
    posts.forEach((post) => {
      expect(post.userId).not.toBeNull();
      expect(post.id).not.toBeNull();
      expect(post.title).not.toBe("");
      expect(post.body).not.toBe("");
    });
    console.log(response.data);
  });

});
