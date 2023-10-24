import { useState } from "react";

const Title = ({ title }) => <h1>{title}</h1>;
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;
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

  const getRandomNumber = () => {
    return Math.floor(Math.random() * (anecdotes.length - 1));
  };

  const [selected, setSelected] = useState(getRandomNumber());
  const [votes, setVotes] = useState(0);
  const [votesByAnecdote, setVotesByAnecdote] = useState(
    Array(anecdotes.length).fill(0)
  );
  const handleNextAnecdote = () => {
    setSelected(getRandomNumber());
  };
  const handleVote = () => {
    const allVotes = [...votesByAnecdote];
    allVotes[selected] += 1;
    setVotesByAnecdote(allVotes);
  };
  return (
    <>
      <Title title="Anecdote of the day" />
      <p>{anecdotes[selected]}</p>
      <p>has {votesByAnecdote[selected]} votes</p>
      <Button onClick={handleVote} text="vote" />
      <Button onClick={handleNextAnecdote} text="next anecdote" />
      <Title title="Anecdote with most votes" />
      <p>{anecdotes[votesByAnecdote.indexOf(Math.max(...votesByAnecdote))]}</p>
      <p>has {Math.max(...votesByAnecdote)} votes</p>
    </>
  );
};
export default App;
