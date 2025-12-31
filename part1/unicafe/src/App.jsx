import { useState } from "react";

const Statistics = (props) => {
  return (
    <p>
      {props.name} {props.value}
    </p>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + bad + neutral;

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <h1>statistics</h1>
      {all > 0 ? (
        <>
          <Statistics name={"good"} value={good} />
          <Statistics name={"neutral"} value={neutral} />
          <Statistics name={"bad"} value={bad} />
          <Statistics name={"all"} value={all} />
          <Statistics name={"average"} value={all / 3} />
          <Statistics name={"positive"} value={`${(good / all) * 100}%`} />
        </>
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

export default App;
