import { addProject, createProjectOption, deleteProject, newProjectInput, projectOptions, projectsList } from './components/project/projectController.js';
import { addTask } from './components/task/taskController.js';
import './style.css';

const modal = document.querySelector('dialog');
const form = document.getElementById('task-form');
let mode = 'add';
console.log(projectsList)

document.addEventListener('click', (e) => {
  if (e.target.matches('.new-project-btn')) {
    if (!newProjectInput.value) return;
    addProject();
    newProjectInput.value = '';
  }
  if (e.target.closest('#all-tasks')) {
 
  }
  if (e.target.closest('#nav-add-task')) {
    mode = 'add';
    form.reset();
    modal.showModal();
    // const options = document.querySelectorAll('option:not(first-child');
    // options.forEach(option => option.remove());
    projectsList.forEach(project => createProjectOption(project));
    console.log(projectsList)
    console.log(mode);
  }
  if (e.target.closest('#form-add-task-btn')) {
    if (mode === 'add') {
      addTask();
    }
    console.log(projectsList);
  }
  if (e.target.closest('#cancel-task-btn')) {
    modal.close();
  }
  if (e.target.closest('.trash-nav-icon')) {
    deleteProject(e);
  }
  if (e.target.closest('.edit-btn')) {
    mode = 'update';
    modal.showModal();
    console.log(mode);
  }
});

newProjectInput.addEventListener('keydown', e => {
  if (e.key === 'Enter' && newProjectInput.value) {
    if (!newProjectInput.value) return;
    addProject();
    projectsList.forEach(project => createProjectOption(project));
    newProjectInput.value = '';
  }
})
