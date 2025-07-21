import type { Projects } from "../generated/api";
import { projects } from "../lib/api/api";
import { ProjectCard } from "./ProjectCard";
import { useEffect, useState } from "react";

export function ProjectList() {
  const [projectsData, setProjectsData] = useState<Projects[]>([]);

  useEffect(() => {
    projects
    .getProjects(
  {
    pageNumber: 0,
    size: 10,
    sort: "id",
  },
  {
    credentials: "include",
  }
)
      .then((res) => setProjectsData(res || []))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      {projectsData.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </>
  );
}
