export default (title, description, dueDate, priority, projectId) => {
  let isComplete = false;
  const setCompleteStatus = () => isComplete = !isComplete;

  return {
    title,
    description,
    dueDate,
    priority,
    projectId,
    get isComplete() {
      return isComplete;
    },
    setCompleteStatus,
  };
};
