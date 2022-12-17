import { useState } from 'react'

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const Section = ({text}) => <h1>{text}</h1>

const Display = ({text, count}) => <p>{text} {count}</p>

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const all = good + neutral + bad
    const avg = (all === 0) ? 0 : (good-bad)/all
    const percent_pos = (all === 0) ? 0 : 100*good/all

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
            <Display text="all" count={good+neutral+bad}/>
            <Display text="average" count={avg}/>
            <Display text="positive" count={percent_pos+" %"}/>
        </div>
  )
}

export default App