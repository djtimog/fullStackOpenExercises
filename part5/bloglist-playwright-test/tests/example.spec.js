const { test, expect, beforeEach, describe } = require("@playwright/test");
const { login, createBlog, createUser } = require("./helper");
describe("Blog app", () => {
  beforeEach(async ({ page }) => {
    await page.request.post("/api/testing/reset");
    await createUser(page, "testuser", "Test User", "password123");
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

    test("only user can delete their blog", async ({ page }) => {
      await createBlog(page, "User1's Blog", "User1", "http://user1blog.com");

      await createUser(page, "otheruser", "Other User", "password456");

      await page.getByRole("button", { name: "logout" }).click();
      await login(page, "otheruser", "password456");

      const blog = page.locator(".blog-title", {
        hasText: "User1's Blog",
      });
      await blog.getByRole("button", { name: "view" }).click();

      await expect(
        blog.getByRole("button", { name: "remove" }),
      ).not.toBeVisible();
    });
  });
});
