import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import classes from "./TaskForm.module.css";
import { TasksApi } from "../generated/api/apis/TasksApi";
import { TasksStateEnum } from "../generated/api";

const tasksApi = new TasksApi();

export function TaskForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const projectId = location.state?.projectId;

  const today = new Date().toISOString().slice(0, 10);

  const [formData, setFormData] = useState({
    code: "",
    name: "",
    description: "",
    startDate: today,
    duration: 0,
    state: TasksStateEnum.InProgress,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "duration" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!projectId) {
      alert("Project ID mancante!");
      return;
    }

    try {
      await tasksApi.createTask(
        {
          tasks: {
            ...formData,
            startDate: new Date(formData.startDate),
            projectId: projectId,
          },
        },
        { credentials: "include" }
      );
      alert("Task creato!");
      navigate("/");
    } catch (error) {
      alert("Errore durante la creazione del task.");
    }
  };

  return (
    <div className={classes.task_form}>
      <form onSubmit={handleSubmit}>
        <label>Codice Task</label>
        <input type="text" name="code" value={formData.code} onChange={handleChange} required />

        <label>Nome Task</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Descrizione</label>
        <textarea name="description" value={formData.description} onChange={handleChange} />

        <label>Data Inizio</label>
        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />

        <label>Durata (giorni)</label>
        <input type="number" name="duration" value={formData.duration} onChange={handleChange} required />

        <label>Stato</label>
        <select name="state" value={formData.state} onChange={handleChange}>
          <option value={TasksStateEnum.InProgress}>In corso</option>
          <option value={TasksStateEnum.Completed}>Completato</option>
          <option value={TasksStateEnum.Deleted}>Eliminato</option>
        </select>

        <button className={classes.addBtn} type="submit">Crea Task</button>
      </form>
    </div>
  );
}
