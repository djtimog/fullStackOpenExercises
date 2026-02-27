import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";

describe("Blog component", () => {
  test("renders title and author but not url or likes by default", () => {
    const blog = {
      title: "my name is timog",
      author: "Timog",
      url: "www.test.com",
      likes: 12,
      user: { name: "timog" },
    };
    const deleteBlog = () => {};

    render(<Blog blog={blog} deleteBlog={deleteBlog} />);

    expect(screen.getByText("my name is timog")).toBeDefined();
    expect(screen.getByText("Timog")).toBeDefined();

    const urlElement = screen.queryByText("www.test.com");
    const likesElement = screen.queryByText("12");

    expect(urlElement).toBeNull();
    expect(likesElement).toBeNull();
  });

  test("shows url and likes when view button is clicked", async () => {
    const blog = {
      title: "my name is timog",
      author: "Timog",
      url: "www.test.com",
      likes: 12,
      user: { name: "timog" },
    };
    const deleteBlog = () => {};

    render(<Blog blog={blog} deleteBlog={deleteBlog} />);

    const user = userEvent.setup();

    const button = screen.getByText("view");
    await user.click(button);

    expect(screen.getByText("www.test.com")).toBeDefined();
    expect(screen.getByText("12")).toBeDefined();
  });
});
