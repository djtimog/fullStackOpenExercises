import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import Blog from "./Blog";

test("renders title and author but not url or likes by default", () => {
  const blog = {
    title: "my name is timog",
    author: "Timog",
    url: "www.test.com",
    likes: 12,
    user: { name: "timog" },
  };

  render(<Blog blog={blog} />);

  expect(screen.getByText("my name is timog")).toBeDefined();
  expect(screen.getByText("Timog")).toBeDefined();

  const urlElement = screen.queryByText("www.test.com");
  const likesElement = screen.queryByText("12");

  expect(urlElement).toBeNull();
  expect(likesElement).toBeNull();
});
