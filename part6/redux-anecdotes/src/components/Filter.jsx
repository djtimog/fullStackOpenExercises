import { useDispatch, useSelector } from "react-redux";

const Filter = () => {
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const handleChange = (event) => {
    dispatch({ type: "filter/filterAnecdote", payload: event.target.value });
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input value={filter} onChange={handleChange} />
    </div>
  );
};

export default Filter;
