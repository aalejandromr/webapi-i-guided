const express = require("express");

const server = express();

server.get("/", (req, res) => {
  res.send("Hello word");
});

server.get("/now", (req, res) => {
  res.send(Date());
});

server.listen(4000, () => {
  console.log("Server is running on port 4000");
});
