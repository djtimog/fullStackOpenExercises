const { test, expect, beforeEach, describe } = require("@playwright/test");
const { login, createBlog } = require("./helper");
describe("Blog app", () => {
  beforeEach(async ({ page }) => {
    // await page.request.post("/api/testing/reset");
    // const user = {
    //   username: "testuser",
    //   name: "Test User",
    //   password: "password123",
    // };
    // await page.request.post("/api/users", { data: user });
    await page.goto("/");
  });

  test("Login form is shown", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Log in to application" }),
    ).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await login(page, "testuser", "password123");
      await expect(page.getByText("Test User logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await login(page, "testuser", "wrongpassword");

      await expect(page.getByText("Test User logged in")).not.toBeVisible();
      await expect(page.getByText("Wrong username or password")).toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await login(page, "testuser", "password123");
    });

    test.only("a new blog can be created", async ({ page }) => {
      await createBlog(
        page,
        "Test Blog Title",
        "Test Blog Author",
        "http://testblog.com",
      );

      await expect(
        page.getByText("Test Blog Title Test Blog Author"),
      ).toBeVisible();
    });
  });
});
