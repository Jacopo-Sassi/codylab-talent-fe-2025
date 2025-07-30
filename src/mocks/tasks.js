import { http, HttpResponse } from "msw";
import getProjects from "./stubs/getProjects.json";
import getTasks from "./stubs/getTasks.json";

export const tasks = [
  http.get("http://localhost:8090/api/v1/tasks", () => {
    return HttpResponse.json(getTasks);
  }),

  http.post("http://localhost:8090/api/v1/tasks", async ({ request }) => {
    const newTask = await request.clone().json();
    const id = Math.random();
    const fullTask = { id, ...newTask };
    getTasks.push(fullTask);

    const project = getProjects.find((p) => p.id === newTask.projectId);
    if (project) {
      project.tasks = project.tasks || [];
      project.tasks.push(fullTask);
    }

    return HttpResponse.json(getTasks);
  }),

  http.put(
    "http://localhost:8090/api/v1/tasks/:id",
    async ({ params, request }) => {
      const updatedTask = await request.json();
      const { id } = params;

      //Aggiorna il task
      const index = getTasks.findIndex((t) => String(t.id) === id);
      if (index !== -1) {
        getTasks[index] = { ...getTasks[index], ...updatedTask };
      }

      //Aggiorna il task nel progetto
      const project = getProjects.find((p) => p.id === updatedTask.projectId);
      if (project) {
        project.tasks = project.tasks || [];
        const taskIndex = project.tasks.findIndex((t) => String(t.id) === id);
        if (taskIndex !== -1) {
          project.tasks[taskIndex] = {
            ...project.tasks[taskIndex],
            ...updatedTask,
          };
        }
      }

      return HttpResponse.json(updatedTask);
    }
  ),
];
