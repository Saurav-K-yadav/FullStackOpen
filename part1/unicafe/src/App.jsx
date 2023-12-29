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

  const avg = (good - bad) / total; 
  const positive = good / total * 100;
  return (
    <>
      <Title title={title[0]} />
      <Count onClick={goodHandler} text={"good"} />
      <Count onClick={neutralHandler} text={"neutral"} />
      <Count onClick={badHandler} text={"bad"} />
      <Title title={title[1]} />
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All : {total}</p>
      <p>Average: {avg}</p>
      <p>Positive { positive}%</p>
    </>
  );
 };

export default App
