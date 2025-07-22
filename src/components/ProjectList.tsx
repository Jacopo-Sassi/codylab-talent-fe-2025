import type { Projects, Tasks } from "../generated/api";
import { projects } from "../lib/api/api";
import { ProjectCard } from "./ProjectCard";
import { ProjectInfo } from "./ProjectInfo";
import { TaskInfo } from "./TaskInfo";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export function ProjectList() {
  const [projectsData, setProjectsData] = useState<Projects[]>([]);
  const [selectedTask, setSelectedTask] = useState<Tasks | null>(null);
  const [selectedProject, setSelectedProject] = useState<Projects | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const taskId = searchParams.get('task');

  // Carica i progetti
  useEffect(() => {
    projects
    .getProjects(
  {
    pageNumber: 0,
    size: 10,
    sort: "id",
  }
)
      .then((res) => setProjectsData(res || []))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleProjectClick = (project: Projects) => {
    setSelectedProject(project);
    setSelectedTask(null);
  };

  // Sincronizza il task selezionato con l'URL
  useEffect(() => {
    if (taskId) {
      // Cerca il task tra i progetti caricati
      const findTask = () => {
        for (const project of projectsData) {
          const task = project.tasks?.find(t => t.id.toString() === taskId);
          if (task) {
            setSelectedTask(task);
            break;
          }
        }
      };
      findTask();
    } else {
      setSelectedTask(null);
    }
  }, [taskId, projectsData]);

  const handleTaskClick = (task: Tasks) => {
    setSelectedTask(task);
    setSelectedProject(null);
    navigate(`?task/${task.id}`, { replace: true });
  };

  const handleCloseTask = () => {
    setSelectedTask(null);
    navigate('', { replace: true });
  };

  return (
    <>
      {projectsData.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onTaskClick={handleTaskClick} // Usa la nuova funzione
          onProjectClick={handleProjectClick}
        />
      ))}

      {selectedTask && (
        <TaskInfo task={selectedTask} onClose={handleCloseTask} />
      )}
      {selectedProject && (
        <ProjectInfo project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </>
  );
}
