const Header = (props) => {
    return (
        <h1>
            {props.course_name}
        </h1>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.obj.name} {props.obj.exercises}
        </p>
    )
}

const Content = (props) => {
    return (
        <div>
            <Part obj={props.parts[0]} />
            <Part obj={props.parts[1]} />
            <Part obj={props.parts[2]} />
        </div>
    )
}

const Total = (props) => {
    return(
        <p>
            Number of exercises {props.parts.reduce(
                (sum, part) => part.exercises+sum,
                0)}
        </p>
    )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course_name={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts} />
    </div>
  )
}

export default App