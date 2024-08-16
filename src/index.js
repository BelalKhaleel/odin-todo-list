import todo from './components/todo/todoModel.js';
import project from './components/project/projectModel.js';
import { addProject } from './components/project/projectController.js';
import './style.css';

// const list = todo('create project', 'todo list project', '8/4/2024', 'high');
// list.addNote('try to finish it by today');
// console.log(list);
// const list2 = todo('design project', 'style todo list project', '9/4/2024', 'medium');
// list2.addNote('try to finish it by tomorrow');
// console.log(list2);

// const project1 = project();
// project1.addListToProject(list, list2);
// console.log(project1)

document.addEventListener('click', (e) => {
  if (e.target.matches('.new-project-btn')) {
    addProject();
  }
});
