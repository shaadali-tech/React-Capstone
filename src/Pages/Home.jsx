import { useState, useMemo } from "react";

function Home({ tasks, dispatch }) {
  const [filter, setFilter] = useState("all");

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.filter((task) => !task.completed).length;

  const filteredTasks = useMemo(() => {
    console.log("Filtering running...");

    if (filter === "completed") return tasks.filter((t) => t.completed);
    if (filter === "pending") return tasks.filter((t) => !t.completed);
    return tasks;
  }, [tasks, filter]);

  const handleTasksUI = () => {
    dispatch({ type: "CLEAR_TASKS" });
  };

  return (
    <div className="home">
      <h1>Welcome to the Task Manager App</h1>
      <p>Manage your tasks efficiently and stay organized!</p>

      <h3>Total: {totalTasks}</h3>
      <h3>Completed: {completedTasks}</h3>
      <h3>Pending: {pendingTasks}</h3>

      <button onClick={() => setFilter("all")}>All</button>
      <button onClick={() => setFilter("completed")}>Completed</button>
      <button onClick={() => setFilter("pending")}>Pending</button>
      <button onClick={handleTasksUI}>Clear</button>
      {filteredTasks.map((task) => (
        <div key={task.id}>
          <h2>{task.title}</h2>
          <p>{task.description}</p>

          <button
            onClick={() => dispatch({ type: "DELETE_TASK", payload: task.id })}
          >
            Delete
          </button>

          <button
            onClick={() => dispatch({ type: "TOGGLE_TASK", payload: task.id })}
          >
            {task.completed ? "Mark as Incomplete" : "Mark as Complete"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
