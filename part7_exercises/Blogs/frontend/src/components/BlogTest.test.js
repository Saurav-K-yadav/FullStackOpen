import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import { elementType } from "prop-types";
import userEvent from "@testing-library/user-event";
import { useEffect } from "react";

test("Blog doesnot display all by Default", () => {
  const blog = {
    title: "New Blog",
    author: "Saurav",
    url: "localhost",
    likes: 100,
    user: { name: "Saurav" },
  };
  render(<Blog blog={blog} />);
  let Title = screen.queryByText(blog.title);

  screen.debug(Title);
  expect(Title).toBeDefined();

  let Author = screen.queryByText(blog.author);
  expect(Author).toBeNull();

  let Likes = screen.queryByText(blog.likes);
  expect(Likes).toBeNull();
});

test("The show button shows all", async () => {
  const blog = {
    title: "New Blog",
    author: "Saurav",
    url: "localhost",
    likes: 100,
    user: { name: "Saurav" },
  };
  const container = render(<Blog blog={blog} />).container;

  let div = container.querySelector(".view");
  expect(div).toHaveStyle("display: none");

  const user = userEvent.setup();
  const button = screen.getByText("View Details");
  await user.click(button);

  div = container.querySelector(".view");
  expect(div).not.toHaveStyle("display: none");
});

test("When the like button is clicked", async () => {
  const blog = {
    title: "New Blog",
    author: "Saurav",
    url: "localhost",
    likes: 100,
    user: { name: "Saurav" },
  };
  const mockHandler = jest.fn();
  render(<Blog blog={blog} addLikes={mockHandler} />);
  const user = userEvent.setup();
  const button = screen.getByText("like");
  await user.click(button);
  await user.click(button);
  expect(mockHandler.mock.calls).toHaveLength(2);
});
