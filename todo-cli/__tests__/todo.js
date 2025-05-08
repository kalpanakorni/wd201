/* eslint-disable no-undef */
const { todoList } = require("../todo.js");

describe("Todo List Test Suite", () => {
  let todos;
  const formattedDate = (d) => d.toISOString().split("T")[0];
  const today = formattedDate(new Date());
  const yesterday = formattedDate(new Date(new Date().setDate(new Date().getDate() - 1)));
  const tomorrow = formattedDate(new Date(new Date().setDate(new Date().getDate() + 1)));

  beforeEach(() => {
    todos = todoList();
    todos.add({ title: "Test overdue", dueDate: yesterday, completed: false });
    todos.add({ title: "Test today incomplete", dueDate: today, completed: false });
    todos.add({ title: "Test today complete", dueDate: today, completed: true });
    todos.add({ title: "Test due later", dueDate: tomorrow, completed: false });
  });

  test("should add a new todo", () => {
    const count = todos.all.length;
    todos.add({ title: "New todo", dueDate: today, completed: false });
    expect(todos.all.length).toBe(count + 1);
    expect(todos.all[count].title).toBe("New todo");
  });

  test("should mark a todo as completed", () => {
    expect(todos.all[0].completed).toBe(false);
    todos.markAsComplete(0);
    expect(todos.all[0].completed).toBe(true);
  });

  test("should retrieve overdue items", () => {
    const overdues = todos.overdue();
    expect(overdues.length).toBe(1);
    expect(overdues[0].title).toBe("Test overdue");
  });

  test("should retrieve due today items", () => {
    const dueToday = todos.dueToday();
    expect(dueToday.length).toBe(2);
    expect(dueToday.map((t) => t.title)).toEqual(
      expect.arrayContaining(["Test today incomplete", "Test today complete"])
    );
  });

  test("should retrieve due later items", () => {
    const dueLater = todos.dueLater();
    expect(dueLater.length).toBe(1);
    expect(dueLater[0].title).toBe("Test due later");
  });

  test("should format displayable list correctly", () => {
    const list = todos.dueToday();
    const str = todos.toDisplayableList(list);
    expect(str).toContain("[x] Test today complete");
    expect(str).toContain("[ ] Test today incomplete");
    expect(str).not.toContain(today + "");
  });
});
