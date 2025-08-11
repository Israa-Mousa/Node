const http = require('http');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200);
    res.end(JSON.stringify({ message: "Welcome to the server" }));
  } else if (req.method === 'GET' && req.url === '/about') {
    res.writeHead(200);
    res.end(JSON.stringify({ message: "This is the about route" }));
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: "Route not found" }));
  }
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
