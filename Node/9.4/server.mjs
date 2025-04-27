// server.mjs
import { createServer } from "node:http";

const server = createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(
    "Hello Class Nodejs!" +
      new Date().toISOString() +
      " U are user number " +
      Math.random() * 9999
  );
});

// 8080 http
// 80 http

// 443 https
// hyper text transfer protocol secured

// starts a simple http server locally on port 3000
server.listen(3000, "127.0.0.1", () => {
  console.log("Listening on 127.0.0.1:3000");
});

// run with `node server.mjs`
