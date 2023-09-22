const http = require('http');
const fs = require('fs');
const path = require('path');
 
// Create an HTTP server
const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/api/users') {
    // Read user data from a file using fs and path modules
    fs.readFile(path.join(__dirname, 'users.json'), 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    });
  } 
   // Create a user data from a file using fs and path modules
  else if (req.method === 'POST' && req.url === '/api/users1') {
    fs.appendFile(path.join(__dirname, 'users.json'), 'Bob', (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data);
      });
          // Deletes the file using fs and path modules
        } else if (req.method === 'DELETE' && req.url === '/api/users3') {
            fs.unlink(path.join(__dirname, 'users.json'),(err, data) => {
                if (err) {
                  res.writeHead(500, { 'Content-Type': 'text/plain' });
                  res.end('Internal Server Error');
                  return;
                }
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(data);
              });
            } 
});
 
// Start the server on port 3000
server.listen(3000, () => {
  console.log('Server running on <http://localhost:3000/>');
});
 
