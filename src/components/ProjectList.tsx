import type { Projects, Tasks } from "../generated/api";
import { projects } from "../lib/api/api";
import { ProjectCard } from "./ProjectCard";
import { TaskInfo } from "./TaskInfo";
import { useEffect, useState } from "react";

export function ProjectList() {
  const [projectsData, setProjectsData] = useState<Projects[]>([]);
  const [selectedTask, setSelectedTask] = useState<Tasks | null>(null);

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

  return (
    <>
      {projectsData.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onTaskClick={(task) => setSelectedTask(task)}
        />
      ))}

      {selectedTask && (
        <TaskInfo task={selectedTask} onClose={() => setSelectedTask(null)} />
      )}
    </>
  );
}
