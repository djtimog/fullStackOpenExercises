const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, cur) => {
    sum = sum + cur.likes;
    return sum;
  };
  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const likeBlog = blogs.map((blog) => blog.likes);
  const maxLikeBlog = Math.max(...likeBlog);
  const maxLikeBlogIndex = likeBlog.indexOf(maxLikeBlog);
  return blogs[maxLikeBlogIndex];
};
const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const checkForMoreBlogs = (author, blogs) => {
    const blogsByAuthor = blogs.filter((blog) => blog.author === author);
    return blogsByAuthor.length;
  };

  const blogCounts = blogs.map((blog) => {
    return {
      author: blog.author,
      blogs: checkForMoreBlogs(blog.author, blogs),
    };
  });

  const maxBlogCount = Math.max(...blogCounts.map((count) => count.blogs));
  const maxBlogCountIndex = blogCounts.findIndex(
    (count) => count.blogs === maxBlogCount
  );
  return blogCounts[maxBlogCountIndex];
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
