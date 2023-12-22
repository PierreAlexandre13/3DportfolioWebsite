const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
  // Handling /app/homepage endpoint
  if (req.url === '/homepage' || req.url === '/homepage/') {
    const indexPath = path.join(__dirname, 'index.html');
    serveStaticFile(res, indexPath);
  } 
  else if (req.url === '/page2' || req.url === '/page2/') {
    const otherPath = path.join(__dirname, 'page2.html');
    serveStaticFile(res, otherPath);
  } 
  else {
    // Handle other routes or endpoints here
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

function serveStaticFile(res, filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  }

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
