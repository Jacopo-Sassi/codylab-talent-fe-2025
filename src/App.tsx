import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import classes from "./App.module.css";
import { useAuth } from "./assets/hooks/useAuth";
import { Header } from "./components/Header";
import { ProjectForm } from "./components/ProjectForm";
import { ProjectInfo } from "./components/ProjectInfo";
import { TaskForm } from "./components/TaskForm";
import { TaskInfo } from "./components/TaskInfo";
import { Projects } from "./pages/Projects";
import { Workload } from "./pages/Workload";
import { ProjectsContext } from "./pages/ProjectsContext";

function App() {
  const { loading } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  if (loading) return <div>Loading...</div>;

  return (
    <div className={classes.app}>
      <Router>
        <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <Routes>
          <Route element={<ProjectsContext />}>
            <Route path="/" element={<Projects searchTerm={searchTerm} />}>
              <Route path="projects/:projectId" element={<ProjectInfo />} />
              <Route path="tasks/:taskId" element={<TaskInfo />} />
            </Route>
            <Route path="/projects/add" element={<ProjectForm />} />
            <Route path="/tasks/add" element={<TaskForm />} />
            <Route path="/project/:id/edit" element={<ProjectForm />} />
            <Route path="/task/:id/edit" element={<TaskForm />} />
          </Route>
          <Route
            path="/workload"
            element={<Workload searchTerm={searchTerm} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
