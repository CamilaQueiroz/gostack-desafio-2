const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];


app.get("/repositories", (req, res) => {
  return res.json(repositories);
});

app.post("/repositories", (req, res) => {
  const { title, url, techs } = req.body;

  const repository = {
    id: uuid(),
    likes: 0,
    techs,
    title,
    url,
  };

  repositories.push(repository);
  return res.json(repository);

});

app.put("/repositories/:id", (req, res) => {
  const { title, url, techs } = req.body;
  const { id } = req.params;

  const repoIndex = repositories.findIndex(repo => repo.id === id);

  if (repoIndex < 0) {
    return res.status(400).json({'error': 'Id not found'});
  }

  const repository = { id, likes: repositories[repoIndex].likes, techs, title, url };
  repositories[repoIndex] = repository;

  return res.json(repository);

});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;

  const repoIndex = repositories.findIndex(repo => repo.id === id);

  if (repoIndex < 0) {
    return res.status(400).json({'error': 'Id not found'});
  }

  repositories.splice(repoIndex, 1);

  return res.status(204).send();

});

app.post("/repositories/:id/like", (req, res) => {
  const { id } = req.params;

  const repoIndex = repositories.findIndex(repo => repo.id === id);

  if (repoIndex === -1) {
    return res.status(400).json({'error': 'Id not found'});
  }

  repositories[repoIndex].likes += 1

  return res.json(repositories[repoIndex]);

});

module.exports = app;
