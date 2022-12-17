import { useState } from 'react'

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const Section = ({text}) => <h1>{text}</h1>

const Display = ({text, count}) => <p>{text} {count}</p>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increment = (counter, handler) => () => handler(counter+1)

  return (
    <div>
        <Section text="give feedback"/>
        <Button handleClick={increment(good, setGood)} text="good"/>
        <Button handleClick={increment(neutral, setNeutral)} text="neutral"/>
        <Button handleClick={increment(bad, setBad)} text="bad"/>
        <Section text="statistics"/>
        <Display text="good" count={good}/>
        <Display text="neutral" count={neutral}/>
        <Display text="bad" count={bad}/>

    </div>
  )
}

export default App