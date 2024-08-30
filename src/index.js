import { addProject, deleteProject, newProjectInput, projectsList, saveProjectsToLocalStorage } from './components/project/projectController.js';
import { createProjectOption, displayProjectOptions, loadProjects, displayProjectTasks } from './components/project/projectView.js';
import { addTask, deleteTask, editTask } from './components/task/taskController.js';
import { displayTask, loadTaskValues } from './components/task/taskView.js';
import './style.css';

const modal = document.querySelector('dialog');
const form = document.getElementById('task-form');
let mode = 'add';
const formTaskButton = document.getElementById('form-task-btn');

console.log(formTaskButton)
document.addEventListener('click', (e) => {
  if (e.target.matches('.new-project-btn')) {
    if (!newProjectInput.value) return;
    addProject();
    newProjectInput.value = '';
    saveProjectsToLocalStorage();
  }
  if (e.target.closest('.sidebar-nav-project')) {
    displayProjectTasks(e);
  }
  if (e.target.closest('#nav-add-task')) {
    mode = 'add';
    formTaskButton.textContent = 'Add Task';
    form.reset();
    modal.showModal();
    displayProjectOptions();
    console.log(projectsList)
    console.log(mode);
  }
  if (e.target.closest('#form-task-btn')) {
    if (mode === 'add') {
      addTask();
      const task = addTask();
      displayTask(task);
    } else if (mode === 'update') {
      editTask();
    }
    saveProjectsToLocalStorage();
  }
  if (e.target.closest('#cancel-task-btn')) {
    modal.close();
  }
  if (e.target.closest('.trash-nav-icon')) {
    deleteProject(e);
    saveProjectsToLocalStorage();
  }
  if (e.target.closest('.edit-btn')) {
    mode = 'update';
    formTaskButton.textContent = 'Edit Task';
    modal.showModal();
    console.log(mode);
    loadTaskValues(e);
  }
  if (e.target.closest('.delete-btn')) {
    deleteTask(e);
  }
});

newProjectInput.addEventListener('keydown', e => {
  if (e.key === 'Enter' && newProjectInput.value) {
    if (!newProjectInput.value) return;
    addProject();
    projectsList.forEach(project => createProjectOption(project));
    newProjectInput.value = '';
    saveProjectsToLocalStorage();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  loadProjects();
  console.log(projectsList)
  const allTasks = projectsList[0].tasksList;
  allTasks.forEach(task => displayTask(task));
});