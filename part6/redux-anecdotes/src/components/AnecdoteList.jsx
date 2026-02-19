import React from "react";
import { useDispatch, useSelector } from "react-redux";

function AnecdoteList() {
  const anecdotes = useSelector((state) => {
    return state.anecdotes
      .filter((anecdote) =>
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase()),
      )
      .sort((a, b) => b.votes - a.votes);
  });
  const dispatch = useDispatch();
  const vote = (anecdote) => {
    dispatch({ type: "anecdote/voteAnecdote", payload: { id: anecdote.id } });
    dispatch({
      type: "notification/setNotification",
      payload: `You voted '${anecdote.content}'`,
    });
  };
  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AnecdoteList;
