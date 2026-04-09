import {
  useReducer,
  useState,
  useMemo,
  useEffect,
  lazy,
  Suspense,
} from "react";
import reducer from "./Reducers/taskreducer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import TaskForms from "./Pages/TaskForms";

const TaskForm = lazy(() => import("./Components/TaskForm"));
const Home = lazy(() => import("./Pages/Home"));

function App() {
  const Tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const [tasks, dispatch] = useReducer(reducer, Tasks);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    console.log("Filtering running...");

    if (filter === "completed") return tasks.filter((t) => t.completed);
    if (filter === "pending") return tasks.filter((t) => !t.completed);
    return tasks;
  }, [tasks, filter]);

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

  const handleTasksUI = () => {
    dispatch({ type: "CLEAR_TASKS" });
  };

  return (
    <>
      <h1>Task Manager</h1>

      <BrowserRouter>
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path="/" element={<Home tasks={tasks} />} />
            <Route path="/add" element={<TaskForms addTask={addTask} />} />
          </Routes>
        </Suspense>
      </BrowserRouter>

      <button onClick={handleTasksUI}>Clear</button>
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
