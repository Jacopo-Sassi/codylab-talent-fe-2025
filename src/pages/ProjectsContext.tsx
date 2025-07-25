import { createContext, useEffect, useState, useCallback } from "react";
import type { Projects } from "../generated/api";
import { projects } from "../lib/api/api";
import { Outlet } from "react-router-dom";

// Aggiorna il tipo del contesto per includere la funzione refresh
interface ProjectsContextType {
  projectsData: Projects[];
  refreshProjects: () => Promise<void>;
  loading: boolean;
}

export const ProjectsDataContext = createContext<ProjectsContextType>({
  projectsData: [],
  refreshProjects: async () => {},
  loading: false,
});

export function ProjectsContext() {
  const [projectsData, setProjectsData] = useState<Projects[]>([]);
  const [loading, setLoading] = useState(false);

  // Funzione per caricare i progetti
  const loadProjects = useCallback(async () => {
    setLoading(true);
    try {
      const res = await projects.getProjects({
        pageNumber: 0,
        size: 10,
        sort: "id",
      });
      setProjectsData(res || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Funzione per ricaricare i progetti (da esporre nel contesto)
  const refreshProjects = useCallback(async () => {
    await loadProjects();
  }, [loadProjects]);

  // Carica i progetti al mount del componente
  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  return (
    <ProjectsDataContext.Provider
      value={{
        projectsData,
        refreshProjects,
        loading
      }}
    >
      <Outlet />
    </ProjectsDataContext.Provider>
  );
}
