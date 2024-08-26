import { addProject, createProjectOption, newProjectInput, projectsList } from './components/project/projectController.js';
import { displayTask } from './components/task/taskController.js';
import './style.css';

const modal = document.querySelector('dialog');

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
    
  }
  if (e.target.closest('#cancel-task-btn')) {
    modal.close();
  }
});
