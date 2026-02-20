import { createSlice } from "@reduxjs/toolkit";

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    createAnecdote: (state, action) => {
      return [...state, action.payload];
    },
    voteAnecdote: (state, action) => {
      const id = action.payload.id;
      const changedState = state.map((anecdote) => {
        return anecdote.id === id
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote;
      });
      return changedState;
    },
    setAnecdote: (state, action) => action.payload,
  },
});

export const { createAnecdote, voteAnecdote, setAnecdote } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
