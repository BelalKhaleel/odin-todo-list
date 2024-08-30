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
      const task = addTask();
      displayTask(task);
    } else if (mode === 'update') {
      console.log(taskId);

      for (const project of projectsList) {
        if (project.tasksList) {
          const task = project.tasksList.find(t => t.id === taskId);
          if (task) {
            const title = document.getElementById('task-title-input');
            const description = document.getElementById('task-description-input');
            const dueDate = document.getElementById('task-due-date-input');
            const priority = document.getElementById('task-priority-input');
            const taskProject = document.getElementById('task-project');
            const oldProject = project; // Save the reference to the old project before updating
            const newProjectName = taskProject.value;
            console.log(oldProject, newProjectName, task.project.toLowerCase().replace(/\s+/g, '-'))
            // Check if the project has been changed
              if (task.project.toLowerCase().replace(/\s+/g, '-') !== newProjectName) {
                // Remove the task from the old project's task list
                if (oldProject.title !== 'All Tasks') {
                  const taskIndex = oldProject.tasksList.indexOf(task);
                  if (taskIndex > -1) {
                    oldProject.tasksList.splice(taskIndex, 1);
                  }
    
                  // Find the new project and add the task to its task list
                  const newProject = projectsList.find(p => p.title === newProjectName);
                  if (newProject && newProject.title !== 'All Tasks') {
                    newProject.tasksList.push(task);
                  }
                }
              }
              task.title = title.value;
              task.description = description.value;
              task.dueDate = dueDate.value;
              task.priority = priority.value;
              task.project= taskProject.value;
              updateTaskCard(task);
          }
        }
      }

      // console.log(task);

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