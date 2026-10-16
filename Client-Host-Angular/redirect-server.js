const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(301, { Location: 'http://localhost:4202' + req.url });
    res.end('Redirecting to http://localhost:4202');
});

server.listen(4200, () => {
    console.log('Redirect server running at http://localhost:4200 -> http://localhost:4202');
});
