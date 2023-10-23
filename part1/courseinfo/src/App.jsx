const Header = (props) => {
  return <h1>{props.course}</h1>;
};
const Part = (props) => {
  return (
    <p>
      {props.part} {props.excercises}
    </p>
  );
};
const Content = (props) => {
  return (
    <>
      {props.parts.map(({ name, excercises }, i) => (
        <Part key={name + i} part={name} excercises={excercises} />
      ))}
    </>
  );
};
const Total = (props) => {
  let numberOfExcersises = 0;
  props.parts.forEach((part) => {
    numberOfExcersises = numberOfExcersises + part.excercises;
  });
  return <p>Number of excercises {numberOfExcersises}</p>;
};

const App = () => {
  const course = {
    name: "Half stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        excercises: 10,
      },
      {
        name: "Using props to pass data",
        excercises: 7,
      },
      {
        name: "State of a component",
        excercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
