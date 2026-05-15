import Task from "./task-model";
import TaskView from "./task-view";
import { isPlainObject, trimData } from "../../middleware";

export default class TaskController {
  static getAllTasks() {
    return JSON.parse(localStorage.getItem("all tasks"));
  }
  static getTaskById(id, tasks) {
    if (typeof id !== "number") throw new Error("Task id must be an integer.");
    if (!Array.isArray(tasks)) throw new Error("Iterable is not an array.");
    return tasks.find((task) => task.id === id);
  }
  static createTask(taskDetails) {
    if (!isPlainObject(taskDetails))
      throw new Error("Incorrect data type. It should be an object");
    trimData(taskDetails);
    const title = taskDetails["task-title"];
    const description = taskDetails["task-description"];
    const dueDate = taskDetails["task-due-date"];
    const priority = taskDetails["task-priority"];
    const project = taskDetails["task-project"];
    if (!title || !description || !dueDate) return;
    return new Task(title, description, dueDate, priority, project);
  }
  static updateTask(task, taskUpdates) {
    if (!isPlainObject(taskUpdates))
      throw new Error("Incorrect data type. It should be an object");
    trimData(taskUpdates);
    task.title = taskUpdates["task-title"];
    task.description = taskUpdates["task-description"];
    task.dueDate = taskUpdates["task-due-date"];
    task.priority = taskUpdates["task-priority"];
    task.project = taskUpdates["task-project"];
  }
  static deleteTask(id, tasks) {
    if (typeof id !== "number") throw new Error("Id must be an integer.");
    if (!Array.isArray(tasks)) throw new Error("Second argument should be an array of tasks.");
    const index = tasks.findIndex((task) => task.id === id);
    tasks.splice(index, 1);
  }
}

