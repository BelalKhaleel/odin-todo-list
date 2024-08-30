import Task from "./taskModel";
import {
  projectsList,
  saveProjectsToLocalStorage,
} from "../project/projectController";
import { taskId, updateTaskCard, displayTask } from "./taskView";
import { clearTaskCards } from "./taskView";

const title = document.getElementById("task-title-input");
const description = document.getElementById("task-description-input");
const dueDate = document.getElementById("task-due-date-input");
const priority = document.getElementById("task-priority-input");
const project = document.getElementById("task-project");

function getAllTasks() {
  return projectsList[0].tasksList;
}

function addTask() {
  if (!title.value || !description.value || !dueDate.value) return;
  const task = Task(
    title.value.trim(),
    description.value.trim(),
    dueDate.value,
    priority.value,
    project.options[project.selectedIndex].textContent
  );
  const index = projectsList.findIndex(
    (p) => p.title === project.options[project.selectedIndex].textContent
  );
  if (index > 0) projectsList[index].tasksList.push(task);
  const allTasks = getAllTasks();
  const isTaskInAllTasks = allTasks.some(
    (t) =>
      t.title === task.title &&
      t.description === task.description &&
      t.dueDate === task.dueDate
  );

  if (!isTaskInAllTasks) {
    allTasks.push(task);
  }
  console.log(task);
  return task;
}

function editTask() {
  console.log(taskId);
  projectsList.forEach(p => {
    if (p.tasksList) {
      const task = p.tasksList.find((t) => t.id === taskId);
      if (task) {
        const oldProject = p;
        const newProjectName = project.value;
        console.log(
          oldProject,
          newProjectName,
          task.project.toLowerCase().replace(/\s+/g, "-")
        );
        if (
          task.project.toLowerCase().replace(/\s+/g, "-") !== newProjectName &&
          oldProject.title !== "All Tasks"
        ) {
          const taskIndex = oldProject.tasksList.indexOf(task);
          if (taskIndex > -1) {
            oldProject.tasksList.splice(taskIndex, 1);
          }

          const newProject = projectsList.find(
            (p) => p.title === newProjectName
          );
          if (newProject && newProject.title !== "All Tasks") {
            newProject.tasksList.push(task);
          }
        }
        task.title = title.value.trim();
        task.description = description.value.trim();
        task.dueDate = dueDate.value;
        task.priority = priority.value;
        task.project = project.value;
        updateTaskCard(task);
      }
    }
  });
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
  const allTasks = getAllTasks();
  const index = allTasks.findIndex((t) => t.id === id);
  if (index > -1) allTasks.splice(index, 1);
  taskCard.remove();
  saveProjectsToLocalStorage();
}

function filterTasks(filterCriteria) {
  clearTaskCards();
  getAllTasks()
    .filter(filterCriteria)
    .forEach((task) => displayTask(task));
}

export { getAllTasks, addTask, editTask, deleteTask, filterTasks };
