import todo from './components/todo/todoModel.js';
import project from './components/project/projectModel.js';
import sidebar, { createSidebarElement, sidebarNavProjects } from './components/sidebar/sidebar.js';
import trash from './components/sidebar/trash-solid.svg';
import openFolder from './components/sidebar/folder-open-solid.svg';
import './style.css';

const list = todo('create project', 'todo list project', '8/4/2024', 'high');
list.addNote('try to finish it by today');
console.log(list);
const list2 = todo('design project', 'style todo list project', '9/4/2024', 'medium');
list2.addNote('try to finish it by tomorrow');
console.log(list2);

const project1 = project();
project1.addListToProject(list, list2);
console.log(project1)

const container = document.createElement('div');
container.classList.add('container');
const body = document.querySelector('body');
body.appendChild(container);

const aside = document.createElement('aside');
container.appendChild(aside);
aside.appendChild(sidebar);

const main = document.createElement('main');
container.appendChild(main);

const tasks = document.createElement('div');
tasks.classList.add('tasks');
main.appendChild(tasks);


document.addEventListener('click', (e) => {
  if (e.target.matches('.new-project-btn')) {
    const newProjectInput = document.querySelector('.new-project-input');
    if (newProjectInput.value.includes(' ')) {
      const newProject = createSidebarElement(newProjectInput.value, 'sidebar-nav-project', newProjectInput.value.split(' ').join('-').toLowerCase(), openFolder);
      const trashIcon = document.createElement('img');
      trashIcon.classList.add('trash-nav-icon');
      trashIcon.src = trash;
      newProject.appendChild(trashIcon);
      sidebarNavProjects.append(newProject);
    } else {
      const newProject = createSidebarElement(newProjectInput.value, 'sidebar-nav-project', newProjectInput.value.toLowerCase(), openFolder);
      const trashIcon = document.createElement('img');
      trashIcon.classList.add('trash-nav-icon');
      trashIcon.src = trash;
      newProject.appendChild(trashIcon);
      sidebarNavProjects.append(newProject);
    }
  }
});
