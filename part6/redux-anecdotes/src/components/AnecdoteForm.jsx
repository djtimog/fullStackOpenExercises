import React from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { appendAnecdote } from "../reducers/anecdoteReducer";
function AnecdoteForm() {
  const dispatch = useDispatch();
  const handleAnecdote = (event) => {
    event.preventDefault();

    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(appendAnecdote(content));
    dispatch(setNotification(`You created '${content}'`, 2));
  };
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
}

export default AnecdoteForm;
