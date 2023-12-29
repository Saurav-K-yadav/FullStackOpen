import { useState } from 'react'
const Title = ({ title }) => {
  return (<>
    <h1>{ title}</h1>
  </>);
}
 
const Count = (props) => { 
  return (<>
  <button onClick={props.onClick}>{props.text}</button>
  </>);
}

const StatisticLine = (props) => { 
  return (
    <>
      <td>{props.text}</td>
      <td>: {props.val}</td>
    </>
  );
};
const Statistics = ({good,bad,total,neutral }) => {
 const avg = (good - bad) / (total == 0 ? 1 : total);
 const positive = (good / (total == 0 ? 1 : total)) * 100;
  if (total != 0)
  return (
    <table>
      <tbody>
        <tr>
          <StatisticLine text={"Good"} val={good} />
        </tr>
        <tr>
          <StatisticLine text={"Neutral"} val={neutral} />
        </tr>
        <tr>
          <StatisticLine text={"Bad"} val={bad} />
        </tr>
        <tr>
          <StatisticLine text={"All"} val={total} />
        </tr>
        <tr>
          <StatisticLine text={"Average"} val={avg} />
        </tr>
        <tr>
          <StatisticLine text={"Positive"} val={positive + "%"} />
        </tr>
      </tbody>
    </table>
  );
};

const App = () => {
  const title = ['Give Feedback', 'Statistics']
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);

  
  const neutralHandler = () => {
    setNeutral(neutral + 1);
    setTotal(good + bad + neutral + 1);
  };

  const goodHandler = () => {
    setGood(good + 1);
    setTotal(good + bad + neutral + 1);

  };

  const badHandler = () => {
    setBad(bad + 1);
    setTotal(good + bad + neutral + 1);
  };

  
  return (
    <>
      <Title title={title[0]} />
      <Count onClick={goodHandler} text={"good"} />
      <Count onClick={neutralHandler} text={"neutral"} />
      <Count onClick={badHandler} text={"bad"} />
      <Title title={title[1]} />
     
     
      <Statistics good={good} bad={bad} total={total} neutral={ neutral} />
    </>
  );
 };

export default App
