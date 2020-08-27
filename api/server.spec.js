const server = require("./server");
const supertest = require("supertest");
const db = require("../database/connection");

beforeAll(() => {
  return db("users").truncate();
});

describe("Auth", () => {
  describe("Register", () => {
    it("returns error if user fails to enter a password", async () => {
      const fakeCreds = {
        username: "newTestUser",
      };

      const res = await supertest(server)
        .post("/auth/register")
        .send(fakeCreds);
      expect(res.status).toBe(500); // server sent 500 because the password was not supplied.
    });

    it("allows the user to create an account", async () => {
      const fakeCreds = {
        username: "newTestUser",
        password: "newTestPassword",
      };

      const res = await supertest(server)
        .post("/auth/register")
        .send(fakeCreds);
      expect(res.status).toBe(201); // the user should have been created successfully.
    });
  });

  describe("Login", () => {
    it("denies a new user with bad credentials", async () => {
      const fakeCreds = {
        username: "newTestUser",
        password: "newTestPassword",
      };

      await supertest(server).post("/auth/register").send(fakeCreds);
      fakeCreds.password += "p";
      const res = await supertest(server).post("/auth/login").send(fakeCreds);
      expect(res.status).toBe(401);
    });
    it("allows a new user to log in", async () => {
      const fakeCreds = {
        username: "newTestUser",
        password: "newTestPassword",
      };

      await supertest(server).post("/auth/register").send(fakeCreds);
      const res = await supertest(server).post("/auth/login").send(fakeCreds);
      expect(res.status).toBe(200);
    });
  });
});
