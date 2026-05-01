export default class Task {
  static #currentId = parseInt(localStorage.getItem('taskId')) || 0;

  constructor(title, description, dueDate, priority, project) {
    this.id = Task.#currentId;
    Task.#currentId += 1;
    localStorage.setItem('taskId', Task.#currentId);
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.project = project;
    this.isComplete = false;
  }

  get id() {
    return this.id;
  }
}

// let id = parseInt(localStorage.getItem('taskId')) || 0;

// export default (title, description, dueDate, priority, project) => {
//   let isComplete = false;
//   id++;
//   localStorage.setItem('taskId', id);

//   return {
//     id,
//     title,
//     description,
//     dueDate,
//     priority,
//     project,
//     get isComplete() {
//       return isComplete;
//     },
//     set isComplete(checkedStatus) {
//       isComplete = checkedStatus;
//     }
//   };
// };
