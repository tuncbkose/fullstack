interface HeaderProps {
    name: string;
}

const Header = (props: HeaderProps) => {
    return <h1>{props.name}</h1>
}

interface Part {
    name: string;
    exerciseCount: number;
}

const Part = (props: Part) => {
    return (
        <p>
            {props.name} {props.exerciseCount}
        </p>
    )
}

interface ContentProps {
    parts: Part[];
}

const Content = (props: ContentProps) => {
    return (
        <div>
            {props.parts.map((part, index) =>
                <Part key={index} {... part}/>)}
        </div>
    )
}

const Total = (props: ContentProps) => {
    return (
        <p>
            Number of exercises {props.parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </p>
    )
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header name={courseName}/>
      <Content parts={courseParts}/>
      <Total parts={courseParts}/>
    </div>
  );
};

export default App;