const http = require('http');
const PORT = process.env.PORT || 3001;
const VERSION = 'v1 (Blue)';
const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    return res.end(JSON.stringify({status: 'ok', version: VERSION}));
  }
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  res.end(`<!doctype html><html><head><meta name="viewport" content="width=device-width"><title>Blue-Green Demo</title></head><body style="font-family:Arial;margin:3rem"><h1>Hello from ${VERSION}!</h1><p>Deployment demo is running.</p><p>Health endpoint: <a href="/health">/health</a></p></body></html>`);
});
server.listen(PORT, '0.0.0.0', () => console.log(`${VERSION} listening on ${PORT}`));
