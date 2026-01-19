import { useContext } from "react";
import ListItem from "./HostTaskList";
import styles from "./HostTask.module.css";
import { TaskContext } from "../../store/taskStore";

function HostTask() {
  const { tasks } = useContext(TaskContext);

  return (
    <div className={`${styles["items-container"]}`}>
      <div className="p-4 grid gap-6  xl:grid-cols-1  ">
        {tasks.map((item, index) => (
          <ListItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

export default HostTask;
