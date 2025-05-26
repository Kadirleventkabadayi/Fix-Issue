function greet(name: string): string {
  return `Hello, ${name}!`;
}

const userName: string = "TypeScript Developer";
console.log(greet(userName));

import http from 'http';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Merhaba Node.js TypeScript Projesi!\n');
});

const port = 3000;
server.listen(port, () => {
  console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
});