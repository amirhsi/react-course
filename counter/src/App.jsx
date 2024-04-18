import "./App.css";

function App() {
  let counter = 15;

  const addValue = () => {
    counter = counter + 1;
    console.log(counter);
  };

  return (
    <>
      <h1>React</h1>
      <button onClick={addValue}>Add</button> <button>Remove</button>
      <p>footer:</p>
    </>
  );
}

export default App;
