import { useContext } from "react";
import ListItem from "./CompletedList";
import styles from "./Completed.module.css";
import { TaskContext } from "../../store/taskStore";
import WelcomeMessage from "../UI/WelcomeMessage";
import { UserContext } from "../../store/userStore";

function Completed() {
  const { tasks } = useContext(TaskContext);
  const { user } = useContext(UserContext);

  if (!user) return <p>Please login to see tasks</p>;

  const filteredTasks = tasks.filter((task) => {
    return task.assigneeEmail.trim().toLowerCase() === user.email.toLowerCase();
  });

  const completedTasks = filteredTasks.filter((task) => {
    // console.log("task", task.status);
    return task.status === "completed";
  });

  return (
    <div className={`${styles["items-container"]}`}>
      <WelcomeMessage tasks={completedTasks} />
      {completedTasks.map((item, index) => (
        <ListItem key={index} item={item} />
      ))}
    </div>
  );
}

export default Completed;
