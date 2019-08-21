const express = require("express");

const db = require("./data/hubs-model");

const server = express();

// middleware
server.use(express.json());

server.get("/", (req, res) => {
  res.send("Hello word");
});

server.get("/now", (req, res) => {
  res.send(Date());
});

server.get("/hubs", (req, res) => {
  db.find()
    .then(hubs => {
      res.json(hubs);
      // especificly says we are returning json
    })
    .catch(error => {
      res.status(500).json({
        error
      });
    });
});

server.delete("/hubs/:id", (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(hub => {
      hub
        ? res.status(200).json(hub)
        : res.status(404).json({
            error: "Hub not found"
          });
    })
    .catch(error => {
      res.status(500).json({
        error
      });
    });
});

server.put("/hubs/:id", (req, res) => {
  const { id } = req.params;
  const newHub = req.body;
  db.update(id, newHub)
    .then(hub => {
      hub
        ? res.status(200).json(hub)
        : res.status(404).json({
            error: "Hub not found"
          });
    })
    .catch(error => {
      res.status(500).json({
        error
      });
    });
});

server.post("/", (req, res) => {
  const newHub = req.body;
  db.add(newHub)
    .then(hub => {
      res.status(201).json(hub);
    })
    .catch(error => {
      res.status(500).json({
        error,
        message: "failed to create new hub"
      });
    });
});

server.listen(4000, () => {
  console.log("Server is running on port 4000");
});
