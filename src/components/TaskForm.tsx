import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TasksStateEnum, type Tasks } from "../generated/api";
import { tasks } from "../lib/api/api";
import classes from "./TaskForm.module.css";
import { ProjectsDataContext } from "../pages/ProjectsContext";

export function TaskForm() {
  const navigate = useNavigate();
  const { id: taskId } = useParams();
  const projectsData = useContext(ProjectsDataContext);
  const currentTask = projectsData
    .flatMap((project) => project.tasks || [])
    .find((t) => t.id?.toString() === taskId);
    
  const today = new Date().toISOString().slice(0, 10);

  const emptyState = {
    code: "",
    name: "",
    description: "",
    startDate: today,
    duration: 0,
    state: TasksStateEnum.InProgress,
  }

  const [formData, setFormData] = useState(currentTask || emptyState);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "duration" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentTask?.projectId) {
      alert("Project ID mancante!");
      return;
    }

    const save = currentTask ? ({tasks}) => tasks.updateTask(currentTask.id, tasks) : tasks.createTask;

    try {
      await save({
        tasks: {
          ...formData,
          startDate: new Date(formData.startDate?.toString() || ""),
          projectId: currentTask?.projectId,
        },
      });
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
        <input
          type="text"
          name="code"
          value={formData.code}
          onChange={handleChange}
          required
        />

        <label>Nome Task</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Descrizione</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <label>Data Inizio</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate?.toString()}
          onChange={handleChange}
          required
        />

        <label>Durata (giorni)</label>
        <input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          required
        />

        <label>Stato</label>
        <select name="state" value={formData.state} onChange={handleChange}>
          <option value={TasksStateEnum.InProgress}>In corso</option>
          <option value={TasksStateEnum.Completed}>Completato</option>
          <option value={TasksStateEnum.Deleted}>Eliminato</option>
        </select>

        <button className={classes.addBtn} type="submit">
          Crea Task
        </button>
      </form>
    </div>
  );
}
