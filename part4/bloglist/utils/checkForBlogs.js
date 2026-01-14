const checkForMoreBlogs = (author, blogs) => {
  const blogsByAuthor = blogs.filter((blog) => blog.author === author);
  return blogsByAuthor.length;
};
