import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { Projects, Tasks } from "../generated/api";
import { projects } from "../lib/api/api";
import { ProjectCard } from "./ProjectCard";
import { ProjectInfo } from "./ProjectInfo";
import { TaskInfo } from "./TaskInfo";

type ProjectListProps = {
  searchTerm: string;
};

export function ProjectList({ searchTerm }: ProjectListProps) {
  const [projectsData, setProjectsData] = useState<Projects[]>([]);
  const [selectedTask, setSelectedTask] = useState<Tasks | null>(null);
  const [selectedProject, setSelectedProject] = useState<Projects | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const taskId = searchParams.get("task");
  const projectId = searchParams.get("project");

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

  useEffect(() => {
    if (taskId) {
      const task = projectsData
        .flatMap(project => project.tasks || [])
        .find(t => t.id.toString() === taskId);
      setSelectedTask(task || null);
    } else {
      setSelectedTask(null);
    }
  }, [taskId, projectsData]);

  useEffect(() => {
    if (projectId) {
      const project = projectsData.find(p => p.id.toString() === projectId);
      setSelectedProject(project || null);
    } else {
      setSelectedProject(null);
    }
  }, [projectId, projectsData]);

  const handleProjectClick = (project: Projects) => {
    navigate(`?project=${project.id}`, { replace: true });
  };

  const handleTaskClick = (task: Tasks) => {
    navigate(`?task=${task.id}`, { replace: true });
  };

  const handleCloseTask = () => {
    navigate("", { replace: true });
  };

  const handleCloseProject = () => {
    navigate("", { replace: true });
  };

  return (
    <>
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

      {selectedTask && (
        <TaskInfo task={selectedTask} onClose={handleCloseTask} />
      )}
      {selectedProject && (
        <ProjectInfo
          project={selectedProject}
          onClose={handleCloseProject}
        />
      )}
    </>
  );
}
