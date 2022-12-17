import { useState } from 'react'

const Section = ({text}) => <h1>{text}</h1>

const Button = ({text, handleClick}) =>
    <button onClick={handleClick}>{text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  // Adapted from Mozilla Dev Network
  const getRandomIndex = () => Math.floor(Math.random() * 7)

  const randomAnecdote = () => setSelected(getRandomIndex())

  const maxIndex = (arr) => arr.reduce(
      (maxIdxSoFar, currVal, currIdx, arr) => (currVal>arr[maxIdxSoFar]) ? currIdx : maxIdxSoFar,
      0
  )

  const incrementVote = () => {
    const new_votes = [...votes]
    new_votes[selected] ++
    setVotes(new_votes)
  }

  return (
    <div>
      <Section text="Anecdote of the day"/>
      {anecdotes[selected]}<br/>
      has {votes[selected]} votes<br/>
      <Button text="vote" handleClick={incrementVote}/>
      <Button text="next anecdote" handleClick={randomAnecdote}/>
      <Section text="Anecdote with most votes"/>
      {anecdotes[maxIndex(votes)]}
    </div>
  )
}

export default App