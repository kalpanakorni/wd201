// __tests__/todo.js
const todoList = require("../todo");
const { all, add, markAsComplete, overdue, dueToday, dueLater, toDisplayableList } = todoList();

/* eslint-disable no-undef */
describe("Todo List Test Suite", () => {
  beforeAll(() => {
    const today = new Date();
    const oneDay = 60 * 60 * 24 * 1000;
    
    // Add some todos with different due dates
    add({ title: "Pay electricity bill", dueDate: new Date(today.getTime() - oneDay).toISOString().split("T")[0], completed: false });
    add({ title: "Submit assignment", dueDate: new Date().toISOString().split("T")[0], completed: false });
    add({ title: "Buy groceries", dueDate: new Date(today.getTime() + oneDay).toISOString().split("T")[0], completed: false });
    add({ title: "Call mom", dueDate: new Date().toISOString().split("T")[0], completed: true });
  });

  test("Should add a new todo", () => {
    const todoItemsCount = all.length;
    add({ title: "Test todo", dueDate: new Date().toISOString().split("T")[0], completed: false });
    expect(all.length).toBe(todoItemsCount + 1);
  });

  test("Should mark a todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("Should retrieve overdue items", () => {
    const overdueItems = overdue();
    expect(overdueItems.length).toBe(1);
    expect(overdueItems[0].title).toBe("Pay electricity bill");
  });

  test("Should retrieve due today items", () => {
    const dueTodayItems = dueToday();
    expect(dueTodayItems.length).toBe(3); // Includes the one we just added
    expect(dueTodayItems.some(item => item.title === "Submit assignment")).toBe(true);
    expect(dueTodayItems.some(item => item.title === "Call mom")).toBe(true);
  });

  test("Should retrieve due later items", () => {
    const dueLaterItems = dueLater();
    expect(dueLaterItems.length).toBe(1);
    expect(dueLaterItems[0].title).toBe("Buy groceries");
  });

  test("toDisplayableList should format items correctly", () => {
    const todayItems = dueToday();
    const displayableList = toDisplayableList(todayItems);
    
    expect(displayableList).toContain("[ ] Submit assignment");
    expect(displayableList).toContain("[x] Call mom");
    expect(displayableList).not.toContain(new Date().toISOString().split("T")[0]);
  });
});