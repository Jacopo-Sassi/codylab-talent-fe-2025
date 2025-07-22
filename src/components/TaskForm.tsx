import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import classes from "./TaskForm.module.css";
import type { Tasks } from "../generated/api";
import { TasksApi } from "../generated/api/apis/TasksApi";
import { TasksStateEnum } from "../generated/api";

const tasksApi = new TasksApi();

export function TaskForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { projectId?: number };

  const todayStr = new Date().toISOString().slice(0, 10);
  const [projectId, setProjectId] = useState<number>(state?.projectId ?? 0);

  const [formData, setFormData] = useState<
    Omit<Tasks, "id" | "startDate"> & { startDate: string }
  >({
    code: "",
    name: "",
    description: "",
    startDate: todayStr,
    duration: 0,
    state: TasksStateEnum.InProgress,
    projectId: projectId,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "duration" ? Number(value) : value,
    }));
    if (name === "projectId") {
      setProjectId(Number(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await tasksApi.createTask(
        {
          tasks: {
            ...formData,
            startDate: new Date(formData.startDate),
          },
        },
        { credentials: "include" }
      );
      alert("Task creato con successo!");
      navigate("/");
    } catch (error) {
      alert("Errore durante la creazione del task.");
    }
  };

  return (
    <div className={classes.task_form}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="projectId">Codice Progetto</label>
        <input
          type="text"
          id="projectId"
          name="projectId"
          value={projectId}
          onChange={handleChange}
          required
        />

        <label htmlFor="code">Codice Task</label>
        <input
          type="text"
          id="code"
          name="code"
          value={formData.code}
          onChange={handleChange}
          required
        />

        <label htmlFor="name">Nome Task</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Descrizione</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <label htmlFor="startDate">Data Inizio</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
        />

        <label htmlFor="duration">Durata (giorni)</label>
        <input
          type="number"
          id="duration"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          required
        />

        <label htmlFor="state">Stato</label>
        <select
          id="state"
          name="state"
          value={formData.state}
          onChange={handleChange}
          required
        >
          <option value={TasksStateEnum.Completed}>Completato</option>
          <option value={TasksStateEnum.InProgress}>In corso</option>
          <option value={TasksStateEnum.Deleted}>Eliminato</option>
        </select>

        <button className={classes.addBtn} type="submit">
          Crea nuovo task
        </button>
      </form>
    </div>
  );
}
