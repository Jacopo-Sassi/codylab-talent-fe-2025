import { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import type { Projects, Tasks } from "../generated/api";
import { ProjectsDataContext } from "../pages/ProjectsContext";
import { ProjectCard } from "./ProjectCard";

type ProjectListProps = {
  searchTerm: string;
};

export function ProjectList({ searchTerm }: ProjectListProps) {
  const navigate = useNavigate();
  const projectsData = useContext(ProjectsDataContext);

  const handleProjectClick = (project: Projects) => {
    navigate(`/projects/${project.id}`, { replace: true });
  };

  const handleTaskClick = (task: Tasks) => {
    navigate(`/tasks/${task.id}`, { replace: true });
  };

  return (
    <>
      {projectsData
        .filter(
          (project) =>
            searchTerm === "" ||
            project.name?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onTaskClick={handleTaskClick}
            onProjectClick={handleProjectClick}
          />
        ))}
      <Outlet />
    </>
  );
}

