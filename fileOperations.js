const fs = require('fs');

 // Write a file
fs.writeFile('example.txt', 'Hello', (err, data) => {
    if (err) {
        console.error('Error writing in the file:', err);
        return;
    }
});

// Read a file
fs.readFile('example.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }
    console.log('File content:', data);
});

// Delete a file
fs.unlink('example.txt', (err, data) => {
    if (err) {
        console.error('Error locating the file:', err);
        return;
    }
});