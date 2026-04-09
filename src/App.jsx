import { act, useReducer, useState } from "react";
import reducer from "./Reducers/taskreducer";
import { useEffect } from "react";

import "./App.css";
import TaskForm from "./Components/TaskForm";

function App() {
  const Tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const [tasks, dispatch] = useReducer(reducer, Tasks);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const addTask = (newTask) => {
    dispatch({
      type: "ADD_TASK",
      payload: {
        ...newTask,
        id: Date.now(),
        completed: false,
      },
    });
  };

  const handletasksui = () => {
    dispatch({ type: "CLEAR_TASKS" });
  };
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter((task) => task.completed).length;

  const pendingTasks = tasks.filter((task) => !task.completed).length;
  return (
    <>
      <h1>Task Manager</h1>
      <h3>Total: {totalTasks}</h3>
      <h3>Completed: {completedTasks}</h3>
      <h3>Pending: {pendingTasks}</h3>
      <TaskForm onTaskSubmit={addTask} />
      <button onClick={handletasksui}>Clear</button>
      <button onClick={() => setFilter("all")}>All</button>
      <button onClick={() => setFilter("completed")}>Completed</button>
      <button onClick={() => setFilter("pending")}>Pending</button>
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
    </>
  );
}

export default App;
