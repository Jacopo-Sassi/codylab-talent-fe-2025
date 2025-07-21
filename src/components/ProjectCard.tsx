import { useState } from "react";
import type { Projects } from "../generated/api/models/Projects";
import type { Tasks } from "../generated/api/models/Tasks";
import { TaskInfo } from "./TaskInfo";
import classes from "./ProjectCard.module.css";


export function ProjectCard({ project }: { project: Projects }) {
  const [selectedTask, setSelectedTask] = useState<Tasks | null>(null);

  return (
    <section className={classes.project}>
      <h2>{project.name}</h2>
      <div className={classes.tasks}>
        <ul>
          {project.tasks.map((task) => (
            <li
              key={task.id}
              onClick={() => setSelectedTask(task)} 
            >
              {task.name}
            </li>
          ))}
        </ul>
        <li className={classes.newTask}>
          <a href="#">Nuova Task</a>
        </li>
      </div>

      {selectedTask && (
        <TaskInfo
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </section>
  );
}
