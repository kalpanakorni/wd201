// todo.js
const todoList = () => {
  const all = [];
  
  const add = (todoItem) => {
    all.push(todoItem);
  };
  
  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  const overdue = () => {
    return all.filter(
      (item) => item.dueDate < new Date().toISOString().split("T")[0]
    );
  };

  const dueToday = () => {
    return all.filter(
      (item) => item.dueDate === new Date().toISOString().split("T")[0]
    );
  };

  const dueLater = () => {
    return all.filter(
      (item) => item.dueDate > new Date().toISOString().split("T")[0]
    );
  };

  const toDisplayableList = (list) => {
    return list
      .map((item) => {
        const checkbox = item.completed ? "[x]" : "[ ]";
        const date =
          item.dueDate === new Date().toISOString().split("T")[0]
            ? ""
            : ` ${item.dueDate}`;
        return `${checkbox} ${item.title}${date}`;
      })
      .join("\n");
  };

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};

module.exports = todoList;