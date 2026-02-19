const reducer = (state = "", action) => {
  switch (action.type) {
    case "FILTER":
      return action.payload;
    default:
      state;
  }
  return state;
};
export const filterAnecdote = (filter) => ({ type: "FILTER", payload: filter });

export default reducer;
