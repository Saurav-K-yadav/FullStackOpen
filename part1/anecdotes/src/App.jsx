import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const next = () => {
    let random = Math.floor(Math.random() * anecdotes.length);
    setSelected(random);
  };
  const vote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };
  const maxi = Math.max(...votes);
  const pos = votes.indexOf(maxi);
  console.log(pos);
  return (
    <div>
      <h3>Anecdote of the Day</h3>
      <p>{anecdotes[selected]}</p>
      <p >
        <button onClick={next} >next</button>
      </p>
      <p>
        <button onClick={vote}> Vote </button>
        </p>
        <p>has {votes[selected]} votes
      </p>

      <h3>Anecdote with most Votes</h3>
      <p>{anecdotes[pos]}</p>
    </div>
  );
};

export default App;
