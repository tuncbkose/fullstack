const Header = (props) => {
    return (
        <h1>
            {props.course}
        </h1>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.name} {props.n_exercise}
        </p>
    )
}

const Content = (props) => {
    return (
        <div>
            <Part name={props.parts[0]} n_exercise={props.n_exercises[0]} />
            <Part name={props.parts[1]} n_exercise={props.n_exercises[1]} />
            <Part name={props.parts[2]} n_exercise={props.n_exercises[2]} />
        </div>
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