import { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { WorkloadContext } from "../pages/WorkloadContext";
import classes from "./TaskInfo.module.css";


export function UserTasksInfo() {
    const { workloadData } = useContext(WorkloadContext);
    const navigate = useNavigate();
    const {taskId} = useParams();

    const task = workloadData
    .flatMap((user) => user.tasks || [])
    .find((t) => t.id?.toString() === taskId);

    const onClose = () => {
    navigate("/workload");
  };

  if (!task) {
    return (
      <div>
        Task non trovato!
      </div>
    )
  }

    return (
    <div className={classes.sidebar}>
      <button className={classes.closeButton} onClick={onClose}>
        ×
      </button>
      <div className={classes.task_name}>
        <h3>{task.name}</h3>
        <Link to={`/task/${task.id}/edit`}>
          {" "}
          <span className="material-symbols-outlined">edit</span>{" "}
        </Link>
      </div>
      <p>
        <strong>ID:</strong> {task.id}
      </p>
      <p>
        <strong>Codice:</strong> {task.code}
      </p>
      <p>
        <strong>Progetto:</strong> {task.projectId}
      </p>
      <p>
        <strong>Descrizione:</strong>{" "}
        {task.description || "Nessuna descrizione."}
      </p>
      <p>
        <strong>Data di inizio:</strong>{" "}
        {task.startDate
          ? new Date(task.startDate).toLocaleDateString()
          : "Nessuna data di inizio."}
      </p>
      <p>
        <strong>Durata:</strong> {task.duration || "Nessuna durata."} giorni
      </p>
      <p>
        <strong>Stato:</strong> {task.state?.toUpperCase() || "Nessuno stato."}
      </p>
    </div>
  );
}