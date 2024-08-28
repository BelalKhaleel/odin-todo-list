import Task from "./taskModel";
import { projectsList, saveProjectsToLocalStorage } from "../project/projectController";

const title = document.getElementById('task-title-input');
const description = document.getElementById('task-description-input');
const dueDate = document.getElementById('task-due-date-input');
const priority = document.getElementById('task-priority-input');
const project = document.getElementById('task-project');

function addTask() {
  if (!title.value || !description.value || !dueDate.value) return;
  const task = Task(title.value.trim(), description.value.trim(), dueDate.value, priority.value, project.options[project.selectedIndex].textContent);
  const index = projectsList.findIndex(p => p.title === project.options[project.selectedIndex].textContent);
  if (index > 0) projectsList[index].tasksList.push(task);
  const allTasks = projectsList[0].tasksList;
  const isTaskInAllTasks = allTasks.some(t => t.title === task.title && t.description === task.description && t.dueDate === task.dueDate);

  if (!isTaskInAllTasks) {
    allTasks.push(task);
  }
  console.log(task);
}

function updateTask() {
  
}

function deleteTask(e) {
  const task = e.target.closest('.task-card');
  const projectName = task.querySelector('.project-name').textContent;
  const id = parseInt(task.dataset.taskId);
  if (projectName !== 'All Tasks') {
    const project = projectsList.find(p => p.title === projectName);
    const index = project.tasksList.findIndex(t => t.id === id);
    project.tasksList.splice(index, 1);
  }
  const allTasks = projectsList[0].tasksList;
  const index = allTasks.findIndex(t => t.id === id);
  allTasks.splice(index, 1);
  task.remove();
  saveProjectsToLocalStorage();
}

export { addTask, deleteTask };