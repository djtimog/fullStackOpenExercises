import { useState } from "react";

const StatisticsLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};

const Statistics = (props) => {
  return (
    <table>
      <tbody>
        <StatisticsLine text={"good"} value={props.good} />
        <StatisticsLine text={"neutral"} value={props.neutral} />
        <StatisticsLine text={"bad"} value={props.bad} />
        <StatisticsLine text={"all"} value={props.all} />
        <StatisticsLine text={"average"} value={props.all / 3} />
        <StatisticsLine
          text={"positive"}
          value={`${(props.good / props.all) * 100}%`}
        />
      </tbody>
    </table>
  );
};

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + bad + neutral;

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text={"good"} />
      <Button onClick={() => setNeutral(neutral + 1)} text={"neutral"} />
      <Button onClick={() => setBad(bad + 1)} text={"bad"} />
      <h1>statistics</h1>
      {all > 0 ? (
        <Statistics all={all} good={good} bad={bad} neutral={neutral} />
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

export default App;
