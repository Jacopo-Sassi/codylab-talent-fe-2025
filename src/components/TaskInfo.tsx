import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ProjectsDataContext } from "../pages/ProjectsContext";
import classes from "./TaskInfo.module.css";
import { TasksStateEnum, type Tasks } from "../generated/api";
import { tasks } from "../lib/api/api";

export function TaskInfo() {
  const navigate = useNavigate();
  const { projectsData, refreshProjects } = useContext(ProjectsDataContext);
  const { taskId } = useParams();

  const task = projectsData
    .flatMap((project) => project.tasks || [])
    .find((t) => t.id?.toString() === taskId);

  const [selectedState, setSelectedState] = useState("");

  useEffect(() => {
    if (task?.state) {
      const foundKey = Object.keys(TasksStateEnum).find(
        (key) => TasksStateEnum[key as keyof typeof TasksStateEnum] === task.state
      );
      if (foundKey) setSelectedState(foundKey);
    }
  }, [task]);

  const onClose = () => {
    navigate("/");
  };

  const updateState = (taskId: number, newState: string) => {
    if (!task) return;
    const updatedTask = { ...task, state: TasksStateEnum[newState as keyof typeof TasksStateEnum] };
    tasks.updateTask({ id: taskId, tasks: updatedTask }).then(() => {
      refreshProjects();
      setSelectedState(newState);
    });
  };

  if (!task) {
    return <div>Task non trovato!</div>;
  }

  return (
    <div className={classes.sidebar}>
      <button className={classes.closeButton} onClick={onClose}>
        ×
      </button>
      <div className={classes.task_name}>
        <h3>{task.name}</h3>
        <Link to={`/task/${task.id}/edit`}>
          <span className="material-symbols-outlined">edit</span>
        </Link>
      </div>
      <p><strong>ID:</strong> {task.id}</p>
      <p><strong>Codice:</strong> {task.code}</p>
      <p><strong>Progetto:</strong> {task.projectId}</p>
      <p><strong>Descrizione:</strong> {task.description || "Nessuna descrizione."}</p>
      <p><strong>Data di inizio:</strong> {task.startDate ? new Date(task.startDate).toLocaleDateString() : "Nessuna data di inizio."}</p>
      <p><strong>Durata:</strong> {task.duration || "Nessuna durata."} giorni</p>

      <form>
        <label>
          <strong>Stato:</strong>
          <select
            value={selectedState}
            onChange={(e) => {
              const newState = e.target.value;
              setSelectedState(newState);
              updateState(Number(task.id), newState);
            }}
          >
            <option value="InProgress">In corso</option>
            <option value="Completed">Completato</option>
            <option value="Deleted">Eliminato</option>
          </select>
        </label>
      </form>
    </div>
  );
}
