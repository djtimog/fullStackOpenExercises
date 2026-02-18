const { test, expect, beforeEach, describe } = require("@playwright/test");
const { login, createBlog } = require("./helper");
describe("Blog app", () => {
  beforeEach(async ({ page }) => {
    await page.request.post("/api/testing/reset");
    const user = {
      username: "testuser",
      name: "Test User",
      password: "password123",
    };
    await page.request.post("/api/users", { data: user });
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

    test("a new blog can be created", async ({ page }) => {
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

    test("a blog can be liked", async ({ page }) => {
      await createBlog(
        page,
        "Another Blog Title",
        "Another Blog Author",
        "http://anotherblog.com",
      );

      const blog = page.locator(".blog-title", {
        hasText: "Another Blog Title",
      });
      await blog.getByRole("button", { name: "view" }).click();
      await blog.getByRole("button", { name: "like" }).click();
      await expect(blog.getByText("likes 1")).toBeVisible();
    });

    test("a blog can be deleted", async ({ page }) => {
      await createBlog(
        page,
        "Blog To Delete",
        "Author To Delete",
        "http://deletethisblog.com",
      );

      const blog = page.locator(".blog-title", {
        hasText: "Blog To Delete",
      });
      await blog.getByRole("button", { name: "view" }).click();

      page.on("dialog", (dialog) => dialog.accept());
      await blog.getByRole("button", { name: "remove" }).click();

      await expect(
        page.getByText("Blog To Delete Author To Delete"),
      ).not.toBeVisible();
    });
  });
});
