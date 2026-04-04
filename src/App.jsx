import { useState } from "react";

import "./App.css";
import TaskForm from "./Components/TaskForm";

function App() {
  const Tasks = [
    {
      id: 1,
      title: "Task 1",
      description: "This is task 1",
    },
    {
      id: 2,
      title: "Task 2",
      description: "This is task 2",
    },
    {
      id: 3,
      title: "Task 3",
      description: "This is task 3",
    },
    {
      id: 4,
      title: "Task 4",
      description: "This is task 4",
    },
    {
      id: 5,
      title: "Task 5",
      description: "This is task 5",
    },
  ];

  const [tasks, setTasks] = useState(Tasks);

  const addTask = (newTask) => {
    const taskWithId = {
      id: Date.now(),
      ...newTask,
      completed: false,
    };

    setTasks((prev) => [...prev, taskWithId]);
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleTask = (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  };
  return (
    <>
      <TaskForm onTaskSubmit={addTask} />
      {tasks.map((task) => (
        <div key={task.id}>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
          <button onClick={() => toggleTask(task.id)}>
            {task.completed ? "Mark as Incomplete" : "Mark as Complete"}
          </button>
        </div>
      ))}
    </>
  );
}

export default App;
