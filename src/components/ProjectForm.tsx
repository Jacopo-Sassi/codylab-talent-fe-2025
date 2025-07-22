import { useState } from "react";
import classes from "./ProjectForm.module.css";
import { ProjectsStateEnum, type Projects } from "../generated/api";
import { useNavigate } from "react-router-dom";
import { projects } from "../lib/api/api";

type ProjectFormData = Omit<Projects, "id" | "startDate" | "tasks"> & {
  startDate: string; 
};


export function ProjectForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ProjectFormData>({
    code: "",
    name: "",
    description: "",
    startDate: "",
    duration: 0,
    manager: "",
    state: ProjectsStateEnum.Open,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "duration"
          ? Number(value)
          : name === "state"
          ? value as ProjectsStateEnum
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await projects.createProject({
        projects: {
          ...formData,
          startDate: new Date(formData.startDate),
        },
      });
      alert("Progetto creato con successo!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Errore durante la creazione del progetto.");
    }
    
  };

  return (
    <div className={classes.project_form}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="code">Codice progetto</label>
        <input
          type="text"
          name="code"
          id="code"
          value={formData.code}
          onChange={handleChange}
          required
        />

        <label htmlFor="name">Nome progetto</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Descrizione progetto</label>
        <input
          type="text"
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
        />

        <label htmlFor="startDate">Data di inizio</label>
        <input
          type="date"
          name="startDate"
          id="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
        />

        <label htmlFor="duration">Durata (giorni)</label>
        <input
          type="number"
          name="duration"
          id="duration"
          value={formData.duration}
          onChange={handleChange}
          required
        />

        <label htmlFor="manager">Responsabile</label>
        <input
          type="text"
          name="manager"
          id="manager"
          value={formData.manager}
          onChange={handleChange}
        />

        <label htmlFor="state">Stato del progetto</label>
        <select
          name="state"
          id="state"
          value={formData.state}
          onChange={handleChange}
        >
          <option value={ProjectsStateEnum.Open}>Open</option>
          <option value={ProjectsStateEnum.Closed}>Closed</option>
          <option value={ProjectsStateEnum.Deleted}>Deleted</option>
        </select>

        <button className={classes.addBtn} type="submit">
          Crea nuovo progetto
        </button>
      </form>
    </div>
  );
}
