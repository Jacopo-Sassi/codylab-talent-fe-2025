import { useState } from "react";
import classes from "./App.module.css";
import { Header } from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Workload } from "./pages/Workload";
import { Projects } from "./pages/Projects";
import { useAuth } from "./assets/hooks/useAuth";
import { ProjectForm } from "./components/ProjectForm";
import { TaskForm } from "./components/TaskForm";

function App() {
  const { loading } = useAuth();
  const [searchTerm, setSearchTerm] = useState(""); // stato per la ricerca

  if (loading) return <div>Loading...</div>;

  return (
    <div className={classes.app}>
      <Router>
        <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <Routes>
          <Route path="/" element={<Projects searchTerm={searchTerm} />} />
          <Route path="/workload" element={<Workload />} />
          <Route path="/projects/add" element={<ProjectForm />} />
          <Route path="/tasks/add" element={<TaskForm />} />
          <Route path="/project/:id/edit" element={<ProjectForm />} />
          <Route path="/task/:id/edit" element={<TaskForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
