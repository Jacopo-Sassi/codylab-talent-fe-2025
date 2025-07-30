import { useNavigate, useParams } from "react-router-dom";
import classes from "./UserForm.module.css";
import { useContext, useState } from "react";
import { WorkloadContext } from "../pages/WorkloadContext";
import type { Users } from "../generated/api";
import { users } from "../lib/api/api";

export function UserForm() {
    const {workloadData: usersData, refreshWorkload} = useContext(WorkloadContext);
    
    const navigate = useNavigate();
    const {id : userId} = useParams();
    const currentUser = usersData.find((u) => u.id?.toString() === userId);
    const emptyState = {
        id: undefined,
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        profile: "",
        workingHours: 0,
    };
    const [formData, setFormData] = useState({
       ...emptyState
    });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
        [e.target.name]: e.target.name === "workingHours" ? Number(e.target.value) : e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const save = currentUser ? (user: {users: Users}) => {
      return users.updateUser({ id: currentUser.id!, users: user.users });
    } : (user: { users: Users }) => {
      return users.createUser(user);
    };
    const userToSave: Users = {
      ...formData,
    };


  try {
    const result = await save({ users: userToSave });
    refreshWorkload();
    navigate("/users");
    console.log("User saved successfully:", result);
  } catch (error) {
    console.error("Error saving user:", error);
  }
}

  return (
    <div className={classes.project_form}>
      <form onSubmit={handleSubmit}>
        <label>Nome Utente</label>
        <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} required />

        <label>Cognome Utente</label>
        <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} required />

        <label>Username</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} required />

        <label>Email</label>
        <input type="text" name="email" value={formData.email} onChange={handleChange} required />
        <label>Profilo</label>
        <select name="profile" value={formData.profile} onChange={handleChange} required>
          <option value="manager">Manager</option>
          <option value="developer">Developer</option>
        </select>
        <label>Ore di lavoro</label>
        <input type="number" name="workingHours" value={formData.workingHours} onChange={handleChange} required />

        <button className={classes.addBtn} type="submit">Crea Utente</button>
      </form>
    </div>
  );
}