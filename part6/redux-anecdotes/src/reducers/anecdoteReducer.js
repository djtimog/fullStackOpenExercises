import { createSlice } from "@reduxjs/toolkit";
import anecdotesService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    createAnecdote: (state, action) => {
      return [...state, action.payload];
    },
    voteAnecdote: (state, action) => {
      const anecdote = action.payload;
      const changedState = state.map((stateAnecdote) => {
        return stateAnecdote.id === anecdote.id ? anecdote : stateAnecdote;
      });
      return changedState;
    },
    setAnecdote: (state, action) => action.payload,
  },
});

const { createAnecdote, setAnecdote, voteAnecdote } = anecdoteSlice.actions;

export const initialAnecdote = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll();
    dispatch(setAnecdote(anecdotes));
  };
};

export const appendAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdotesService.createNew(content);
    dispatch(createAnecdote(anecdote));
  };
};

export const electAnecdote = (anecdote) => {
  return async (dispatch) => {
    const votedAnecdote = await anecdotesService.vote(anecdote);
    dispatch(voteAnecdote(votedAnecdote));
  };
};
export default anecdoteSlice.reducer;
