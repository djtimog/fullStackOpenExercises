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

      const blog = page.locator(".blog", {
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

      const blog = page.locator(".blog", {
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

      const blog = page.locator(".blog", {
        hasText: "User1's Blog",
      });
      await blog.getByRole("button", { name: "view" }).click();

      await expect(
        blog.getByRole("button", { name: "remove" }),
      ).not.toBeVisible();
    });

    test("blogs are arranged according to likes", async ({ page }) => {
      await createBlog(page, "Least Liked Blog", "Author1", "http://blog1.com");
      await createBlog(page, "Most Liked Blog", "Author2", "http://blog2.com");
      await createBlog(page, "Third Liked Blog", "Author3", "http://blog3.com");
      const blogs = await page.locator(".blog").all();
      const mostLiked = blogs[1];

      await mostLiked.getByRole("button", { name: "view" }).click();
      await mostLiked.getByRole("button", { name: "like" }).click();
      page.reload();
      const newBlogs = await page.locator(".blog").all();
      await expect(newBlogs[0]).toContainText("Most Liked Blog");
      await expect(newBlogs[1]).toContainText("Least Liked Blog");
      await expect(newBlogs[2]).toContainText("Third Liked Blog");
    });
  });
});
