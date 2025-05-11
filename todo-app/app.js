const express = require('express');
const { Todo } = require('./models');

const app = express();
app.use(express.json());

// GET /todos - Get all todos
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /todos/:id - Delete a todo by id
app.delete("/todos/:id", async (req, res) => {
  const id = req.params.id;
  // Check if id is a valid integer
  if (!/^\d+$/.test(id)) {
    return res.status(500).json({ error: "Invalid ID format" });
  }
  try {
    const deletedCount = await Todo.destroy({ where: { id } });
    res.json(deletedCount > 0);
  } catch (error) {
    res.status(500).json(false);
  }
});

module.exports = app;