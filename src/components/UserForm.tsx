import { useNavigate, useParams } from "react-router-dom";
import classes from "./UserForm.module.css";
import { useContext, useState } from "react";
import { WorkloadContext } from "../pages/WorkloadContext";
import type { Users } from "../generated/api";
import { users } from "../lib/api/api";

export function UserForm() {
    const { workloadData: usersData, refreshWorkload } = useContext(WorkloadContext);

    const navigate = useNavigate();
    const { id: userId } = useParams();
    const currentUser = usersData.find((u) => u.id?.toString() === userId);

    const emptyState = {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        profile: "",
        dailyHours: 0,
    };

    const [formData, setFormData] = useState<Users>(currentUser || emptyState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "dailyHours" ? Number(value) : value
                }));
        
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (currentUser) {
                await users.updateUser({
                    id: currentUser.id!,
                    users: { ...formData, dailyHours: formData.dailyHours, profile: formData.profile }
                });
            } else {
                await users.createUser({ users: { ...formData, dailyHours: formData.dailyHours, profile: formData.profile } });
            }

            await refreshWorkload();
            navigate("/workload");
        } catch (error) {
            console.error("Error saving user:", error);
        }
    };

    return (
        <div className={classes.project_form}>
            <form onSubmit={handleSubmit}>
                <label>Nome Utente</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />

                <label>Cognome Utente</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />

                <label>Username</label>
                <input type="text" name="username" value={formData.username} onChange={handleChange} required />

                <label>Email</label>
                <input type="text" name="email" value={formData.email} onChange={handleChange} required />

                <label>Profilo</label>
               <input type="text" name="profile" value={formData.profile} onChange={handleChange}
                required />

                <label>Ore di lavoro</label>
                <input type="number" name="dailyHours" value={formData.dailyHours} onChange={handleChange} required />

                <button className={classes.addBtn} type="submit">
                    {currentUser ? "Aggiorna Utente" : "Crea Utente"}
                </button>
            </form>
        </div>
    );
}
