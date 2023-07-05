const fs = require('fs');

const syncFileContent = (fileName) => {
    const data = fs.readFileSync(fileName, 'utf-8');
    console.log(data);
    return data;
}

const asyncFileContent = (fileName) => {
    fs.readFile(fileName, 'utf-8', (error, data) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log(data);
        }
    })
}

const syncWriteContent = (fileName, content) => {
    fs.writeFileSync(fileName, content);
    console.log('syncWriteContent');
}

const asyncWriteContent = (fileName, content) => {
    fs.writeFile(fileName,content, (error) => {
        if (error) {
            console.log(error)
        }
        else {
            console.log('asyncWriteContent');
        }
    })
}


module.exports = {syncFileContent, asyncFileContent, syncWriteContent,asyncWriteContent };