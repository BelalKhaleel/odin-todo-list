import { addProject, deleteProject, newProjectInput, projectsList, saveProjectsToLocalStorage } from './components/project/projectController.js';
import { createProjectOption, displayProjectOptions, displayProject, loadProjects } from './components/project/projectView.js';
import { addTask } from './components/task/taskController.js';
import { displayAllTasks } from './components/task/taskView.js';
import './style.css';

const modal = document.querySelector('dialog');
const form = document.getElementById('task-form');
let mode = 'add';

document.addEventListener('click', (e) => {
  if (e.target.matches('.new-project-btn')) {
    if (!newProjectInput.value) return;
    addProject();
    newProjectInput.value = '';
    const projects = JSON.parse(localStorage.getItem("projects"));
    projects.forEach(project => displayProject(project.title));
    saveProjectsToLocalStorage();
  }
  if (e.target.closest('#all-tasks')) {
    displayAllTasks();
  }
  if (e.target.closest('#nav-add-task')) {
    mode = 'add';
    form.reset();
    modal.showModal();
    displayProjectOptions();
    console.log(projectsList)
    console.log(mode);
  }
  if (e.target.closest('#form-add-task-btn')) {
    if (mode === 'add') {
      addTask();
    }
    console.log(projectsList);
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
    modal.showModal();
    console.log(mode);
    saveProjectsToLocalStorage();
  }
  if (e.target.closest('.delete-btn')) {
    const task = e.target.closest('.task-card');
    const id = task.dataset.taskId;
    // const projectName = task.querySelector('.project-name').textContent;
    // const projectIndex = projectsList.findIndex(project => project.title === projectName);
    // const taskIndex = projectsList[projectIndex].tasksList;
    // console.log(projectsList[projectIndex])
    saveProjectsToLocalStorage();
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

document.addEventListener('DOMContentLoaded', loadProjects);