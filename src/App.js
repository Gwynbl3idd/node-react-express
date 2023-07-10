import './App.css';
import {useEffect, useState} from "react";
import Books from './Books';

function App({data}) {
  const [counter, setCounter] = useState(0);
  const [counterContent, setCounterContent] = useState('Counter: ');

  const increaseCounter = () => {
    setCounter(counter + 1);
  }
  const decreaseCounter = () => {
    setCounter(counter - 1);
  }

  useEffect(() => {
    if(counter>=10) {
      setCounterContent('Wow, the counter is now ');
    }
  });

  useEffect(() => {
    setTimeout(() => {
      setCounter(counter + 1);
    }, 1000);
  }, [counter]);

  return (
    <div className="App">
      <header className="App-header">
        Output is {data} {counter}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={increaseCounter}> Click to increase </button>
        <button onClick={decreaseCounter}> Click to decrease </button>
        <h1>{counterContent} {counter}</h1>
        <Books />
      </header>
    </div>
  );
}

export default App;
