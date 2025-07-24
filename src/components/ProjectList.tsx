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
      const findTask = () => {
        for (const project of projectsData) {
          const task = project.tasks?.find((t) => t.id.toString() === taskId);
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

  const handleProjectClick = (project: Projects) => {
    setSelectedProject(project);
    setSelectedTask(null);
    navigate("", { replace: true });
  };

  const handleTaskClick = (task: Tasks) => {
    setSelectedTask(task);
    setSelectedProject(null);
    navigate(`?task/${task.id}`, { replace: true });
  };

  const handleCloseTask = () => {
    setSelectedTask(null);
    navigate("", { replace: true });
  };

  return (
    <>
{projectsData
  .filter((project) =>
    (searchTerm === "" || project.name?.toLowerCase().includes(searchTerm.toLowerCase()))
  )
  .map((project) => (
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
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}
