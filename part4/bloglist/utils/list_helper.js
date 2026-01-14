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

module.exports = {
  dummy,
  totalLikes,
};
