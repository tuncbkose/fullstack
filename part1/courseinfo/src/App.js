const Header = (props) => {
    return (
        <h1>
            {props.course}
        </h1>
    )
}

const Content = (props) => {
    // I had to add the key attribute to get rid of a warning
    // I am not sure why yet, because this is not an HTML list
    return (
        <>
            {props.parts.map((val, idx)=><p key={idx}>{val} {props.n_exercises[idx]}</p>)}
        </>
    )
}

const Total = (props) => {
    return(
        <p>Number of exercises {props.sum}</p>
    )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content parts={[part1, part2, part3]} n_exercises={[exercises1, exercises2, exercises3]}/>
      <Total sum={exercises1+exercises2+exercises3} />
    </div>
  )
}

export default App