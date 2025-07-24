import { createContext, useEffect, useState } from "react";
import type { Projects } from "../generated/api";
import { projects } from "../lib/api/api";
import { Outlet } from "react-router-dom";

export const ProjectsDataContext = createContext<Projects[]>([]);

export function ProjectsContext() {
  const [projectsData, setProjectsData] = useState<Projects[]>([]);

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

    return(
    <ProjectsDataContext.Provider value={projectsData}>
        <Outlet />
    </ProjectsDataContext.Provider>
    )
}
