import { useReducer, useEffect, lazy, Suspense } from "react";
import reducer from "./Reducers/taskreducer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

const Navbar = lazy(() => import("./Pages/Navigation"));
const Home = lazy(() => import("./Pages/Home"));
const TaskForms = lazy(() => import("./Pages/TaskForms"));

function App() {
  const Tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const [tasks, dispatch] = useReducer(reducer, Tasks);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

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

  return (
    <>
      <h1>Task Manager</h1>

      <BrowserRouter>
        <Suspense fallback={<p>Loading...</p>}>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={<Home tasks={tasks} dispatch={dispatch} />}
            />
            <Route path="/add" element={<TaskForms addTask={addTask} />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
