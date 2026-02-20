import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

function AnecdoteList() {
  const dispatch = useDispatch();

  const anecdotes = useSelector((state) => {
    return state.anecdotes
      .filter((anecdote) =>
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase()),
      )
      .sort((a, b) => b.votes - a.votes);
  });

  const vote = (anecdote) => {
    dispatch(voteAnecdote({ id: anecdote.id }));
    dispatch(setNotification(`You voted '${anecdote.content}'`));
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
