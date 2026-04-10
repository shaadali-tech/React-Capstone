import { useReducer, useEffect, lazy, Suspense } from "react";
import reducer from "./Reducers/taskreducer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
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
      <BrowserRouter>
        <Suspense fallback={
          <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        }>
          <Navbar />
          <main className="min-vh-100 bg-light">
            <Routes>
              <Route path="/" element={<Home tasks={tasks} dispatch={dispatch} />} />
              <Route path="/add" element={<TaskForms addTask={addTask} />} />
            </Routes>
          </main>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
