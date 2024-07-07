const http = require('http');
const fs = require('fs');
var allowed = false
const server = http.createServer((req, res) => {
    if (req.url === '/allowed' && req.method === 'GET') {
      if (allowed) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Allowed');
      } else {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Unauthorized');
      }
    } else if (req.url == "/toggle") {
      allowed = !allowed
      console.log(allowed, "toggled")
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end(allowed.toString());
    } else if (req.url == "/status" ) {
        console.log(allowed, "status")
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end(allowed.toString());
    } else if (req.url === '/' && req.method === 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        fs.readFile('index.html', 'utf8', (err, data) => {
          if (err) {
            res.statusCode = 500;
            res.end('Internal Server Error');
          } else {
            res.end(data);
          }
        });
      } 
});

const port = 3090;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});