/* eslint-disable no-undef */
const { todoList } = require("../todo.js");

describe("Todo List Test Suite", () => {
  let todos;
  let today, yesterday, tomorrow;
  const formattedDate = (d) => d.toISOString().split("T")[0];

  beforeEach(() => {
    const now = new Date();
    today = formattedDate(new Date(now));
    yesterday = formattedDate(new Date(now.setDate(new Date().getDate() - 1)));
    tomorrow = formattedDate(new Date(new Date().setDate(new Date().getDate() + 1)));
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
    expect(todos.all[count].dueDate).toBe(today);
    expect(todos.all[count].completed).toBe(false);
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
    expect(overdues[0].dueDate).toBe(yesterday);
    expect(overdues[0].completed).toBe(false);
  });

  test("should retrieve due today items", () => {
    const dueToday = todos.dueToday();
    expect(dueToday.length).toBe(2);
    const titles = dueToday.map((t) => t.title);
    expect(titles).toEqual(expect.arrayContaining(["Test today incomplete", "Test today complete"]));
    dueToday.forEach(item => expect(item.dueDate).toBe(today));
  });

  test("should retrieve due later items", () => {
    const dueLater = todos.dueLater();
    expect(dueLater.length).toBe(1);
    expect(dueLater[0].title).toBe("Test due later");
    expect(dueLater[0].dueDate).toBe(tomorrow);
    expect(dueLater[0].completed).toBe(false);
  });

  test("should format displayable list correctly", () => {
    const list = todos.all;
    const str = todos.toDisplayableList(list);
    // Should include [x] for completed, [ ] for incomplete
    expect(str).toContain(`[x] Test today complete`);
    expect(str).toContain(`[ ] Test today incomplete`);
    expect(str).toContain(`[ ] Test overdue ${yesterday}`);
    expect(str).toContain(`[ ] Test due later ${tomorrow}`);
    // Should not show date for today items
    const todayLines = str.split('\n').filter(line => line.includes('today'));
    todayLines.forEach(line => expect(line.endsWith(today)).toBe(false));
  });
});
    todos.add({
      title: "Test today complete",
      dueDate: today,
      completed: true,
    });
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
      expect.arrayContaining(["Test today incomplete", "Test today complete"]),
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
