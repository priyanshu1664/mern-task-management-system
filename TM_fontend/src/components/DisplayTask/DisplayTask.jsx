import { useContext } from "react";
import TaskList from "./TaskList";
import styles from "./DisplayTaskList.module.css";
import WelcomeMessage from "../UI/WelcomeMessage";
import { TaskContext } from "../../store/taskStore";
import { UserContext } from "../../store/userStore";

function DisplayTask() {
  const { tasks } = useContext(TaskContext);
  const { user } = useContext(UserContext);

  if (!user) return <p>Please login to see tasks</p>;

  const filteredTasks = tasks.filter((task) => {
    return task.assigneeEmail.trim().toLowerCase() === user.email.toLowerCase();
  });

  return (
    <div className={`${styles["items-container"]}`}>
      <WelcomeMessage tasks={filteredTasks} />
      {filteredTasks.map((item, index) => (
        <TaskList key={index} item={item} />
      ))}
    </div>
  );
}

export default DisplayTask;
