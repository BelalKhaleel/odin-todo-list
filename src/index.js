import todo from './components/todo/todoModel.js';
import project from './components/project/projectModel.js';
import sidebar from './components/sidebar/sidebar.js';
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