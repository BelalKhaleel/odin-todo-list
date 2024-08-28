import Task from "./taskModel";
import { allTasks, projectsList } from "../project/projectController";
import { displayTask } from "./taskView";

const title = document.getElementById('task-title-input');
const description = document.getElementById('task-description-input');
const dueDate = document.getElementById('task-due-date-input');
const priority = document.getElementById('task-priority-input');
const project = document.getElementById('task-project');

function addTask() {
  if (!title.value || !description.value || !dueDate.value) return;
  const task = Task(title.value.trim(), description.value.trim(), dueDate.value, priority.value, project.options[project.selectedIndex].textContent);
  const index = projectsList.findIndex(p => p.title === project.options[project.selectedIndex].textContent);
  if (index > -1) projectsList[index].tasksList.push(task);
  console.log(task);
}

function updateTask() {
  
}

function deleteTask() {
  
}

export { addTask };