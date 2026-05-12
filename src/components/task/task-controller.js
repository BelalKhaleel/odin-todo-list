import Task from "./task-model";
import {
  projectsList,
  // saveProjectsToLocalStorage,
} from "../project/project-controller";
import { taskId, updateTaskCard } from "./task-view";
import TaskView from "./task-view";
import { displayProjectTasks } from "../project/project-view";
import { isPlainObject, trimData } from "../../middleware";

export default class TaskController {
  static getAllTasks() {
    const allTasks = JSON.parse(localStorage.getItem("all tasks"));
    return allTasks;
  }
  static getTaskById(id, array) {
    if (typeof id !== "number") throw new Error("Task id must be an integer.");
    if (!Array.isArray(array)) throw new Error("Iterable is not an array.");
    // const allTasks = JSON.parse(localStorage.getItem("all tasks"));
    return array.find(task => task.id === id);
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

    // const allTasks = TaskController.getAllTasks();
    // const isTaskInAllTasks = allTasks.some(
    //   (t) =>
    //     t.title === task.title
    //   && t.description === task.description
    //   && t.dueDate === task.dueDate
    // );

    // if (!isTaskInAllTasks) {
    //   allTasks.push(task);
    // }
  }
  static updateTask(task, taskUpdates) {
    if (!isPlainObject(taskUpdates)) throw new Error("Incorrect data type. It should be an object");
    trimData(taskUpdates);
    task.title = taskUpdates["task-title"];
    task.description = taskUpdates["task-description"];
    task.dueDate = taskUpdates["task-due-date"];
    task.priority = taskUpdates["task-priority"];
    task.project = taskUpdates["task-project"];
    // projectsList.forEach((p) => {
    //   if (!p.tasksList) return;

    //   const task = p.tasksList.find((t) => t.id === taskId);
    //   if (!task) return;

    //   const oldProject = p;
    //   const newProjectName = project.value;
    //   if (
    //     task.project.toLowerCase().replace(/\s+/g, "-") !== newProjectName &&
    //     oldProject.title !== "All Tasks"
    //   ) {
    //     moveTaskToNewProject(oldProject, task, newProjectName);
    //   }
    //   task.title = title.value;
    //   task.description = description.value;
    //   task.dueDate = dueDate.value;
    //   task.priority = priority.value;
    //   task.project = project.value;
    //   updateTaskCard(task);
    // });
  }
  static deleteTask(e) {
    const taskCard = e.target.closest(".task-card");
    const projectName = taskCard.querySelector(".project-name").textContent;
    const id = parseInt(taskCard.dataset.taskId);
    if (projectName !== "All Tasks") {
      const project = projectsList.find((p) => p.title === projectName);
      const index = project.tasksList.findIndex((t) => t.id === id);
      project.tasksList.splice(index, 1);
    }
    const allTasks = TaskController.getAllTasks();
    const index = allTasks.findIndex((t) => t.id === id);
    if (index > -1) allTasks.splice(index, 1);
    taskCard.remove();
    // saveProjectsToLocalStorage();
  }
}

function editTask() {
  projectsList.forEach((p) => {
    if (!p.tasksList) return;

    const task = p.tasksList.find((t) => t.id === taskId);
    if (!task) return;

    const oldProject = p;
    const newProjectName = project.value;
    if (
      task.project.toLowerCase().replace(/\s+/g, "-") !== newProjectName &&
      oldProject.title !== "All Tasks"
    ) {
      moveTaskToNewProject(oldProject, task, newProjectName);
    }
    task.title = title.value;
    task.description = description.value;
    task.dueDate = dueDate.value;
    task.priority = priority.value;
    task.project = project.value;
    updateTaskCard(task);
  });
}

function moveTaskToNewProject(oldProject, task, newProjectName) {
  const taskIndex = oldProject.tasksList.indexOf(task);
  if (taskIndex > -1) {
    oldProject.tasksList.splice(taskIndex, 1);
  }

  const newProject = projectsList.find((p) => p.title === newProjectName);
  if (newProject && newProject.title !== "All Tasks") {
    newProject.tasksList.push(task);
  }
}

// function deleteTask(e) {
//   const taskCard = e.target.closest(".task-card");
//   const projectName = taskCard.querySelector(".project-name").textContent;
//   const id = parseInt(taskCard.dataset.taskId);
//   if (projectName !== "All Tasks") {
//     const project = projectsList.find((p) => p.title === projectName);
//     const index = project.tasksList.findIndex((t) => t.id === id);
//     project.tasksList.splice(index, 1);
//   }
//   const allTasks = TaskController.getAllTasks();
//   const index = allTasks.findIndex((t) => t.id === id);
//   if (index > -1) allTasks.splice(index, 1);
//   taskCard.remove();
//   saveProjectsToLocalStorage();
// }

function filterTasks(filterCriteria) {
  TaskView.clearTaskCards();
  TaskController.getAllTasks()
    .filter(filterCriteria)
    .forEach((task) => TaskView.displayTask(task));
}

export { editTask, filterTasks };
