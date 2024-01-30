const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const fs = require('fs');

// Load JSON file
const comments = require('./comments.json');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// GET /comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// POST /comments
app.post('/comments', (req, res) => {
  const newComment = req.body;
  comments.push(newComment);
  fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
  res.json(comments);
});

// PUT /comments/:id
app.put('/comments/:id', (req, res) => {
  const id = req.params.id;
  const updatedComment = req.body;
  comments[id] = updatedComment;
  fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
  res.json(comments);
});

// DELETE /comments/:id
app.delete('/comments/:id', (req, res) => {
  const id = req.params.id;
  comments.splice(id, 1);
  fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
  res.json(comments);
});

// Start web server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});