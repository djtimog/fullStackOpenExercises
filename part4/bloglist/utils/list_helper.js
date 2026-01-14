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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
