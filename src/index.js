import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import multiply from './modules/multiply';

const myElement = React.createElement('h1', {}, 'I do not use JSX!');
const myElement2 = <h1>I Love JSX!</h1>;
const root = ReactDOM.createRoot(document.getElementById('root'));

const output = multiply(4,5);

root.render(
  <React.StrictMode>
    <App data={output} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
