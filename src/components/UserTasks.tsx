import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { WorkloadContext } from "../pages/WorkloadContext";


export function UserTasks() {
    const { workloadData } = useContext(WorkloadContext);
    const { userId } = useParams();
    const navigate = useNavigate();
    const [selectedUserId, setSelectedUserId] = useState(userId);

    const handleTaskClick = (taskId: number) => {
        navigate(`/tasks/${taskId}`);
    };

    return (
        <div>
            <select
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
            >
                {workloadData.map((user) => (
                    <option key={user.id} value={user.id?.toString()}>
                        {user.firstName} {user.lastName}
                    </option>
                ))}
            </select>
            {workloadData.find((user) => user.id === Number(selectedUserId))?.tasks?.map((task) => (
                <div key={task.id} onClick={() => handleTaskClick(task.id!)}>
                    <h3>{task.name}</h3>
                    <p>{task.description}</p>
                </div>
            ))}
        </div>
    );
}