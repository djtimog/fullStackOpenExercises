import { useDispatch } from "react-redux";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import { useEffect } from "react";
import { setAnecdote } from "./reducers/anecdoteReducer";
import anecdotesService from "./services/anecdotes";
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    anecdotesService.getAll().then((anecdotes) => {
      dispatch(setAnecdote(anecdotes));
    });
  }, [dispatch]);
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
