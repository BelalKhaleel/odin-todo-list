import { createSidebarProject } from '../sidebar/sidebar';

const newProjectInput = document.querySelector('.new-project-input');

export const addProject = () => {
  if (!newProjectInput.value) return;
  if (newProjectInput.value.includes(' ')) {
    createSidebarProject(newProjectInput.value, newProjectInput.value.split(' ').join('-').toLowerCase());
  } else {
    createSidebarProject(newProjectInput.value, newProjectInput.value.toLowerCase());
  }
}