#!/usr/bin/env node
const db = require("./models");
const { Todo } = db;

async function list() {
  try {
    await db.sequelize.sync();
    await Todo.showList();
    process.exit(0);
  } catch (err) {
    console.error("Error listing todos:", err.message);
    process.exit(1);
  }
}
list();
