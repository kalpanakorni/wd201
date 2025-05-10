#!/usr/bin/env node
const db = require("./models");
const { Todo } = db;

async function add() {
  const [, , title, dueDate] = process.argv;
  if (!title || !dueDate) {
    console.error("Usage: node addTodo.js <title> <dueDate:YYYY-MM-DD>");
    process.exit(1);
  }
  try {
    await db.sequelize.sync();
    await Todo.addTask({ title, dueDate, completed: false });
    console.log(`Added todo: '${title}' with due date ${dueDate}`);
    process.exit(0);
  } catch (err) {
    console.error("Error adding todo:", err.message);
    process.exit(1);
  }
}
add();
