import { http, HttpResponse } from "msw";
import getProjects from "./stubs/getProjects.json";

export const projects = [
  http.get("http://localhost:8090/api/v1/projects", () => {
    return HttpResponse.json(getProjects);
  }),

  http.post("http://localhost:8090/api/v1/projects", async ({ request }) => {
    const newProject = await request.clone().json();
    getProjects.push({ id: Math.random(), ...newProject });
    return HttpResponse.json(getProjects);
  }),

  http.put(
    "http://localhost:8090/api/v1/projects/:id",
    async ({ params, request }) => {
      const updatedProject = await request.clone().json();
      const { id } = params;

      const index = getProjects.findIndex((p) => String(p.id) === id);
      if (index !== -1) {
        getProjects[index] = { ...getProjects[index], ...updatedProject };
      }

      return HttpResponse.json(getProjects);
    }
  )];
