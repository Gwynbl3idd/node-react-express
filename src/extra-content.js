const http = require('http');
const fileManager = require("./modules/fileStream");
const {useEffect} = require("react");

const server = http.createServer((req, res) => {
    const data = [
        {
            name: 'A Song of Ice and Fire',
            genre: 'Fantasy',
            author: 'George R R Martin',
        },
        {
            name: 'The Wheel of Time',
            genre: 'Fantasy',
            author: 'Robert Jordan',
        },
        {
            name: 'Wings of Fire',
            genre: 'Autobiography',
            author: 'A P J Abdul Kalam',
        }
    ];

    if(req.url === '/') {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(data));
    }
    else if (req.url === '/autobigraphy') {
        res.writeHead(200, {'Content-Type': 'application/json'});
        const output = data.filter(function (element) {
            return element.genre === 'Autobiography';
        });

        console.log(output);

        res.end(JSON.stringify(output));
    }
});

server.listen(PORT, () => {
    console.log("Server running in Port 3000");
})

fileManager.syncFileContent('./dataFile.txt');

fileManager.asyncFileContent('./dataFile.txt');

fileManager.syncWriteContent('./syncWriteFile', 'Synchronous File Write');

fileManager.asyncWriteContent('./asyncWriteFile', 'ASynchronous Writing of File');

console.log(data);

import { useState, useEffect } from 'react';

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
}, );

<button onClick={increaseCounter}> Click to increase </button>
<button onClick={decreaseCounter}> Click to decrease </button>
<h1>{counterContent} {counter}</h1>
