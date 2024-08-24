// let projectId = 0;
export default (title) => {
  const tasksList = [];
  const addListToProject = (...tasks) => tasksList.push(...tasks);
  // projectId++;

  return {
    // projectId,
    title,
    tasksList,
    // addListToProject,
  }
}