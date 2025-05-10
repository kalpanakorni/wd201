#!/usr/bin/env node
const db = require("./models");
const { Todo } = db;

async function complete() {
  const [, , id] = process.argv;
  if (!id) {
    console.error("Usage: node completeTodo.js <id>");
    process.exit(1);
  }
  try {
    await db.sequelize.sync();
    await Todo.markAsComplete(Number(id));
    console.log(`Marked todo #${id} as complete.`);
    process.exit(0);
  } catch (err) {
    console.error("Error marking todo as complete:", err.message);
    process.exit(1);
  }
}
complete();
