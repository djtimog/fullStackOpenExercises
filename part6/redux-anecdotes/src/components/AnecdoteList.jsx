import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";

function AnecdoteList() {
  const anecdotes = useSelector((state) => {
    const sortedState = state.anecdotes.sort((a, b) => b.votes - a.votes);

    return sortedState.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase()),
    );
  });
  const dispatch = useDispatch();
  const vote = (id) => {
    dispatch(voteAnecdote(id));
  };
  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AnecdoteList;
