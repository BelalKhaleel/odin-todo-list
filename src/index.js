import { addProject } from './components/project/projectController.js';
import { displayTask } from './components/task/taskController.js';
import './style.css';

// const project1 = project();
// project1.addListToProject(list, list2);
// console.log(project1)
const dialog = document.querySelector('dialog');
const taskTitle = document.querySelector('#task-title');

document.addEventListener('click', (e) => {
  if (e.target.matches('.new-project-btn')) {
    addProject();
  }
  if (e.target.closest('#my-project')) {
    // addTodoToAllTasks(list2);
    // console.log(allTasks);
  }
  if (e.target.closest('#add-task')) {
    dialog.showModal();
  }
  if (e.target.closest('#add-task-btn')) {
    console.log(taskTitle.value)
  }
  if (e.target.closest('#cancel-task-btn')) {
    dialog.close();
  }
});

// displayTask()