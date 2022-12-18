const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) =>
    // Proper pluralization
    <b>total of {sum} exercise{(sum===1) ? "" : "s"}</b>

const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) =>
  <>
      {parts.map(
          (part) => <Part key={part.id} part={part}/>
      )}
  </>

const Course = ({course}) => {
  const sum = course.parts.reduce(
      (par_sum, part) => par_sum+part.exercises,
      0)
  return(
      <>
        <Header course={course.name}/>
        <Content parts={course.parts}/>
        <Total sum={sum}/>
      </>
    )
}

export default Course