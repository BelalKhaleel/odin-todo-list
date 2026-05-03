import Task from "./task-model";
import {
  projectsList,
  // saveProjectsToLocalStorage,
} from "../project/project-controller";
import { taskId, updateTaskCard, displayTask, clearTaskCards } from "./task-view";
import { displayProjectTasks } from "../project/project-view";

export default class TaskController {
  static getAllTasks() {
    const projects = JSON.parse(localStorage.getItem("projects"));
    const allTasks = projects[0].tasksList;
    return allTasks;
  }

  static addTask(title, description, dueDate, priority, project) {
    if (!title || !description || !dueDate) return;
    const task = new Task(
      title,
      description,
      dueDate,
      priority,
      project
    );
    // const index = projectsList.findIndex(
    //   (p) => p.title === project
    // );
    // // to add a task to a project other than the 'All Tasks' array
    // if (index > 0) projectsList[index].tasksList.push(task);

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
    return task;
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
    task.title = title.value.trim();
    task.description = description.value.trim();
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

function deleteTask(e) {
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
  saveProjectsToLocalStorage();
}

function filterTasks(filterCriteria) {
  clearTaskCards();
  TaskController.getAllTasks()
    .filter(filterCriteria)
    .forEach((task) => displayTask(task));
}

export { editTask, deleteTask, filterTasks };
