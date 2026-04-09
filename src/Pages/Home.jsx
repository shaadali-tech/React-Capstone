function Home({ tasks }) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.filter((task) => !task.completed).length;
  return (
    <div className="home">
      <h1>Welcome to the Task Manager App</h1>
      <p>Manage your tasks efficiently and stay organized!</p>

      <h3>Total: {totalTasks}</h3>
      <h3>Completed: {completedTasks}</h3>
      <h3>Pending: {pendingTasks}</h3>
    </div>
  );
}

export default Home;
