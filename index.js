const express = require("express");
const postsRouter = require("./data/posts-router");
const server = express();

server.use(express.json());
server.use("/api/posts", postsRouter);


server.get('/', (req, res) => {
  res.send(`
    <h2>Day 2 with Node</h>
    <p>using backend routers</p>
  `);
});



server.listen(5000, () => console.log(`SERVER WORKING ON PORT: 5000`))