import { addProject, deleteProject, newProjectInput, projectsList, saveProjectsToLocalStorage } from './components/project/projectController.js';
import { createProjectOption, displayProjectOptions, loadProjects, displayProjectTasks } from './components/project/projectView.js';
import { addTask, deleteTask } from './components/task/taskController.js';
import { displayTask, loadTaskValues, taskId, updateTaskCard } from './components/task/taskView.js';
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
    } else if (mode === 'update') {
      console.log(taskId);
      let task = null;

      for (const project of projectsList) {
        if (project.tasksList) {
          task = project.tasksList.find(t => t.id === taskId);
          if (task) break;
        }
      }

      console.log(task);
      const title = document.getElementById('task-title-input');
      const description = document.getElementById('task-description-input');
      const dueDate = document.getElementById('task-due-date-input');
      const priority = document.getElementById('task-priority-input');
      const taskProject = document.getElementById('task-project');
        task.title = title.value;
        task.description = description.value;
        task.dueDate = dueDate.value;
        task.priority = priority.value;
        task.project= taskProject.value;

      updateTaskCard(task);
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