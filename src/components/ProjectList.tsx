import type { Projects, Tasks } from "../generated/api";
import { projects } from "../lib/api/api";
import { ProjectCard } from "./ProjectCard";
import { ProjectInfo } from "./ProjectInfo";
import { TaskInfo } from "./TaskInfo";
import { useEffect, useState } from "react";

export function ProjectList() {
  const [projectsData, setProjectsData] = useState<Projects[]>([]);
  const [selectedTask, setSelectedTask] = useState<Tasks | null>(null);
  const [selectedProject, setSelectedProject] = useState<Projects | null>(null);

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
    setSelectedProject(project);
    setSelectedTask(null);
  };

  const handleTaskClick = (task: Tasks) => {
    setSelectedTask(task);
    setSelectedProject(null);
  };

  return (
    <>
      {projectsData.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onProjectClick={handleProjectClick}
          onTaskClick={handleTaskClick}
        />
      ))}

      {selectedTask && (
        <TaskInfo task={selectedTask} onClose={() => setSelectedTask(null)} />
      )}

      {selectedProject && (
        <ProjectInfo project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </>
  );
}
