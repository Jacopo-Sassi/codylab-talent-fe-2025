import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./ProjectForm.module.css";
import { ProjectsStateEnum, type Projects } from "../generated/api";
import { projects } from "../lib/api/api";

export function ProjectForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
      [name]: name === "duration" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await projects.createProject({
        projects: { ...formData, startDate: new Date(formData.startDate) },
      });
      alert("Progetto creato!");
      navigate("/");
    } catch (error) {
      alert("Errore durante la creazione del progetto.");
    }
  };

  return (
    <div className={classes.project_form}>
      <form onSubmit={handleSubmit}>
        <label>Codice progetto</label>
        <input type="text" name="code" value={formData.code} onChange={handleChange} required />

        <label>Nome progetto</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Descrizione</label>
        <input type="text" name="description" value={formData.description} onChange={handleChange} />

        <label>Data di inizio</label>
        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />

        <label>Durata (giorni)</label>
        <input type="number" name="duration" value={formData.duration} onChange={handleChange} required />

        <label>Responsabile</label>
        <input type="text" name="manager" value={formData.manager} onChange={handleChange} />

        <label>Stato</label>
        <select name="state" value={formData.state} onChange={handleChange}>
          <option value={ProjectsStateEnum.Open}>Open</option>
          <option value={ProjectsStateEnum.Closed}>Closed</option>
          <option value={ProjectsStateEnum.Deleted}>Deleted</option>
        </select>

        <button className={classes.addBtn} type="submit">Crea Progetto</button>
      </form>
    </div>
  );
}
