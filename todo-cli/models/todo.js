"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return await Todo.create(params);
    }
    static async showList() {
      console.log("My Todo-list\n");

      console.log("Overdue");
      const overdueItems = await this.overdue();
      overdueItems.forEach((item) => {
        console.log(item.displayableString());
      });
      console.log("");

      console.log("Due Today");
      const dueTodayItems = await this.dueToday();
      dueTodayItems.forEach((item) => {
        console.log(item.displayableString());
      });
      console.log("");

      console.log("Due Later");
      const dueLaterItems = await this.dueLater();
      dueLaterItems.forEach((item) => {
        console.log(item.displayableString());
      });
    }

    static async overdue() {
      const { Op } = require("sequelize");
      return await this.findAll({
        where: {
          dueDate: { [Op.lt]: new Date().toISOString().split("T")[0] },
          completed: false,
        },
        order: [["id", "ASC"]],
      });
    }

    static async dueToday() {
      const { Op } = require("sequelize");
      return await this.findAll({
        where: {
          dueDate: { [Op.eq]: new Date().toISOString().split("T")[0] },
        },
        order: [["id", "ASC"]],
      });
    }

    static async dueLater() {
      const { Op } = require("sequelize");
      return await this.findAll({
        where: {
          dueDate: { [Op.gt]: new Date().toISOString().split("T")[0] },
          completed: false,
        },
        order: [["id", "ASC"]],
      });
    }

    static async markAsComplete(id) {
      const todo = await this.findByPk(id);
      if (todo) {
        todo.completed = true;
        await todo.save();
      }
    }

    displayableString() {
      const today = new Date().toISOString().split("T")[0];
      let checkbox = this.completed ? "[x]" : "[ ]";
      let dateStr = this.dueDate === today ? "" : ` ${this.dueDate}`;
      return `${this.id}. ${checkbox} ${this.title.trim()}${dateStr}`.trim();
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    },
  );
  return Todo;
};
