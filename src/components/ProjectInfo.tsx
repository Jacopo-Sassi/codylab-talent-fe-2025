import { Link, useNavigate, useParams } from "react-router-dom";
import classes from "./ProjectInfo.module.css"
import { useContext } from "react";
import { ProjectsDataContext } from "../pages/ProjectsContext";

export function ProjectInfo() {
  const navigate = useNavigate();
  const projectsData = useContext(ProjectsDataContext);
  const {projectId} = useParams();

  const project = projectsData.find(p => p.id?.toString() === projectId);

  const onClose = () => {
    navigate("/");
  };

  if(!project){
    return(
      <div>
        Progetto non trovato!
      </div>
    )
  }
  return (
    <div className={classes.sidebar}>
      <button className={classes.closeButton} onClick={onClose}>
        ×
      </button>
      <div className={classes.prj_name}>
        <h3>{project.name}</h3>
        <Link to={`/project/${project.id}/edit`}> <span className="material-symbols-outlined">edit</span> </Link>
      </div>
      <p>
        <strong>ID:</strong> {project.id}
      </p>
      <p>
        <strong>Descrizione:</strong>{" "}
        {project.description || "Nessuna descrizione."}
      </p>
      <p>
        <strong>Data di inizio:</strong>{" "}
        {project.startDate
          ? new Date(project.startDate).toLocaleDateString()
          : "Nessuna data di inizio."}
      </p>
      <p>
        <strong>Durata:</strong> {project.duration || "Nessuna durata."} giorni
      </p>
    </div>
  );
}
