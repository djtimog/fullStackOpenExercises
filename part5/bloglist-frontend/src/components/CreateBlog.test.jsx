import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { test, expect, vi } from "vitest";
import CreateBlog from "./CreateBlog";

test("form calls event handler with correct details when submitted", async () => {
  const createBlog = vi.fn();

  render(<CreateBlog createBlog={createBlog} ref={null} />);

  const user = userEvent.setup();

  const titleInput = screen.getByPlaceholderText("title");
  const authorInput = screen.getByPlaceholderText("author");
  const urlInput = screen.getByPlaceholderText("url");

  await user.type(titleInput, "Test Blog");
  await user.type(authorInput, "Timog");
  await user.type(urlInput, "www.test.com");

  const submitButton = screen.getByText("create");
  await user.click(submitButton);

  expect(createBlog).toHaveBeenCalledTimes(1);

  expect(createBlog.mock.calls[0][0]).toEqual({
    title: "Test Blog",
    author: "Timog",
    url: "www.test.com",
  });
});
