const { todoList } = require("./todo");

describe("Todo List", () => {
  let todos;
  const today = new Date();
  const formattedDate = (d) => d.toISOString().split("T")[0];
  const todayStr = formattedDate(today);
  const yesterdayStr = formattedDate(
    new Date(today.setDate(today.getDate() - 1)),
  );
  const tomorrowStr = formattedDate(
    new Date(today.setDate(today.getDate() + 2)),
  );

  beforeEach(() => {
    todos = todoList();
  });

  test("should add a new todo", () => {
    todos.add({ title: "Test Todo", dueDate: todayStr, completed: false });
    expect(todos.all.length).toBe(1);
    expect(todos.all[0].title).toBe("Test Todo");
  });

  test("should mark a todo as completed", () => {
    todos.add({ title: "Test Todo", dueDate: todayStr, completed: false });
    todos.markAsComplete(0);
    expect(todos.all[0].completed).toBe(true);
  });

  test("should retrieve overdue items", () => {
    todos.add({ title: "Overdue", dueDate: yesterdayStr, completed: false });
    todos.add({ title: "Today", dueDate: todayStr, completed: false });
    const overdue = todos.overdue();
    expect(overdue.length).toBe(1);
    expect(overdue[0].title).toBe("Overdue");
  });

  test("should retrieve due today items", () => {
    todos.add({ title: "Today", dueDate: todayStr, completed: false });
    todos.add({ title: "Tomorrow", dueDate: tomorrowStr, completed: false });
    const dueToday = todos.dueToday();
    expect(dueToday.length).toBe(1);
    expect(dueToday[0].title).toBe("Today");
  });

  test("should retrieve due later items", () => {
    todos.add({ title: "Today", dueDate: todayStr, completed: false });
    todos.add({ title: "Tomorrow", dueDate: tomorrowStr, completed: false });
    const dueLater = todos.dueLater();
    expect(dueLater.length).toBe(1);
    expect(dueLater[0].title).toBe("Tomorrow");
  });

  test("should format displayable list correctly", () => {
    todos.add({ title: "Overdue", dueDate: yesterdayStr, completed: false });
    todos.add({ title: "Today", dueDate: todayStr, completed: true });
    todos.add({ title: "Tomorrow", dueDate: tomorrowStr, completed: false });
    const list = todos.all;
    const display = todos.toDisplayableList(list).split("\n");
    expect(display[0]).toBe(`[ ] Overdue ${yesterdayStr}`);
    expect(display[1]).toBe(`[x] Today`);
    expect(display[2]).toBe(`[ ] Tomorrow ${tomorrowStr}`);
  });
});
