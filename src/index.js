import { addProject, createProjectOption, deleteProject, newProjectInput, projectsList } from './components/project/projectController.js';
import { addTask } from './components/task/taskController.js';
import './style.css';

const modal = document.querySelector('dialog');
const form = document.getElementById('task-form');

document.addEventListener('click', (e) => {
  if (e.target.matches('.new-project-btn')) {
    addProject();
    newProjectInput.value = '';
  }
  if (e.target.closest('#all-tasks')) {
 
  }
  if (e.target.closest('#add-task')) {
    modal.showModal();
    console.log(projectsList)
    projectsList.forEach(project => createProjectOption(project));
  }
  if (e.target.closest('#add-task-btn')) {
    addTask();
    console.log(projectsList);
    modal.close();
    form.reset();
  }
  if (e.target.closest('#cancel-task-btn')) {
    modal.close();
  }
  if (e.target.closest('.trash-nav-icon')) {
    deleteProject(e);
  }
});

newProjectInput.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !newProjectInput.value) {
    addProject();
    newProjectInput.value = '';
  }
})