import { createContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import type { Projects, Tasks } from "../generated/api";
import { projects } from "../lib/api/api";
import { ProjectCard } from "./ProjectCard";

type ProjectListProps = {
  searchTerm: string;
};

export const ProjectsDataContext = createContext<Projects[]>([]);

export function ProjectList({ searchTerm }: ProjectListProps) {
  const [projectsData, setProjectsData] = useState<Projects[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    projects
      .getProjects({
        pageNumber: 0,
        size: 10,
        sort: "id",
      })
      .then((res) => setProjectsData(res || []))
      .catch((error) => {
        console.error(error);
      });
  }, []);


  const handleProjectClick = (project: Projects) => {
    navigate(`/projects/${project.id}`, { replace: true });
  };

  const handleTaskClick = (task: Tasks) => {
    navigate(`/tasks/${task.id}`, { replace: true });
  };

  return (
    <ProjectsDataContext.Provider value={projectsData}>
      {projectsData
        .filter(project =>
          searchTerm === "" ||
          project.name?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map(project => (
          <ProjectCard
            key={project.id}
            project={project}
            onTaskClick={handleTaskClick}
            onProjectClick={handleProjectClick}
          />
        ))}

      <Outlet />

    </ProjectsDataContext.Provider>
  );
}
