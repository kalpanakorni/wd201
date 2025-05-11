const request = require('supertest');
const app = require('../app');
const { Todo, sequelize } = require('../models');

describe('DELETE /todos/:id', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await Todo.destroy({ where: {} });
    await sequelize.close();
  });

  it('should return true when todo is successfully deleted', async () => {
    const todo = await Todo.create({
      title: 'Test Todo',
      description: 'Test Description',
      completed: false
    });
    const response = await request(app)
      .delete(`/todos/${todo.id}`)
      .expect(200);
    console.log('Delete existing:', response.body);
    expect(response.body).toBe(true);
    const deletedTodo = await Todo.findByPk(todo.id);
    expect(deletedTodo).toBeNull();
  });

  it('should return false when trying to delete a non-existent todo', async () => {
    const response = await request(app)
      .delete(`/todos/99999`)
      .expect(200);
    console.log('Delete non-existent:', response.body);
    expect(response.body).toBe(false);
  });

  it('should return 500 for invalid id format', async () => {
    const response = await request(app)
      .delete('/todos/invalid-id')
      .expect(500);
    console.log('Delete invalid id:', response.body);
    expect(response.body.error).toBeDefined();
  });
});