const Header = (props) => {
  return <h1> {props.course}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.part}
      {props.exercise}
    </p>
  );
};

const Content = (props) => {
  const names = props.parts.map(function (part) {
    return <Part part={part.name} exercise={part.exercises} />;
  });
  console.log(names);
  return (
    <>
      {props.parts.map((part) => (
        <Part key={part.name} part={part.name} exercise={part.exercises} />
      ))}
    </>
  );
};

const Total = (props) => {
  const total = props.parts.reduce(function (sum, part) {
    return sum + part.exercises;
  }, 0);
  console.log(total);
  return <p>Number of exercises :{total}</p>;
};

export { Total, Content, Part, Header };
