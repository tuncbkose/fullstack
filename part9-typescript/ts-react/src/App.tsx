interface HeaderProps {
    name: string;
}

const Header = (props: HeaderProps) => {
    return <h1>{props.name}</h1>
}

interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface CoursePartWithDescription extends CoursePartBase {
    description: string;
}

interface CoursePartBasic extends CoursePartWithDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartWithDescription {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartWithReqs extends CoursePartWithDescription {
    kind: "special";
    requirements: string[];
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartWithReqs;

const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
    kind: "basic"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: "group"
  },
  {
    name: "Basics of type Narrowing",
    exerciseCount: 7,
    description: "How to go from unknown to string",
    kind: "basic"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
    kind: "background"
  },
  {
    name: "TypeScript in frontend",
    exerciseCount: 10,
    description: "a hard part",
    kind: "basic",
  },
  {
  name: "Backend development",
  exerciseCount: 21,
  description: "Typing the backend",
  requirements: ["nodejs", "jest"],
  kind: "special"
  }
];

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};


const Part = (props: CoursePart) => {
    switch (props.kind) {
        case "basic":
            return (
                <p>
                    {props.name} {props.exerciseCount} <br/>
                    {props.description}
                </p>
            )
        case "background":
            return (
                <p>
                    {props.name} {props.exerciseCount} <br/>
                    {props.description} <br/>
                    Background material: {props.backgroundMaterial}
                </p>
            )
        case "group":
            return (
                <p>
                    {props.name} {props.exerciseCount} <br/>
                    project exercises {props.groupProjectCount}
                </p>
            )
        case "special":
            return (
                <p>
                    {props.name} {props.exerciseCount} <br/>
                    {props.description} <br/>
                    required skills: {props.requirements.join(" ")}
                </p>
            )
        default:
            return assertNever(props);
    }
}

interface ContentProps {
    parts: CoursePart[];
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

  return (
    <div>
      <Header name={courseName}/>
      <Content parts={courseParts}/>
      <Total parts={courseParts}/>
    </div>
  );
};

export default App;