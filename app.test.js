import request from "supertest";
import { getApp } from "./app.js";

const testImage = "./input/5039327622_2_2_1.jpg";

describe("GET", () => {
  test("return 201 with all tasks", async () => {
    const response = await request(getApp()).get("/");
    expect(response.status).toBe(201);
  });

  test("return 200 with task by id", async () => {
    const response = await request(getApp()).get("/task/1");
    expect(response.status).toBe(200);
  });

  test("return 404 when no task", async () => {
    const response = await request(getApp()).get("/task/100");
    expect(response.status).toBe(404);
    expect(response.text).toBe("Task not found!");
  });
});

describe("POST", () => {
  test("return 200 with task by id", async () => {
    const response = await request(getApp())
      .post("/task")
      .attach("file", testImage);

    expect(response.status).toBe(200);
  });

  test("return 404 when no file is send", async () => {
    const response = await request(getApp()).post("/task").attach();
    expect(response.status).toBe(404);
    expect(response.text).toBe("Image not found!");
  });
});
