let id = parseInt(localStorage.getItem('taskId')) || 0;

export default (title, description, dueDate, priority, project) => {
  let isComplete = false;
  id++;
  localStorage.setItem('taskId', id);

  return {
    id,
    title,
    description,
    dueDate,
    priority,
    project,
    get isComplete() {
      return isComplete;
    },
    set isComplete(checkedStatus) {
      isComplete = checkedStatus;
    }
  };
};
