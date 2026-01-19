import React, { useContext } from "react";
import { TaskContext } from "../../store/taskStore";
import "./WelcomeMessage.css";

function WelcomeMessage({ tasks: propTasks }) {
  const { tasks: contextTasks } = useContext(TaskContext);

  // Use props if passed, otherwise fallback to context
  const tasks = propTasks || contextTasks;

  return (
    <div className="text-center my-6">
      {tasks.length === 0 ? (
        <h3 className="welcome-head text-xl font-semibold text-gray-700">
          No Tasks Available.
        </h3>
      ) : null}
    </div>
  );
}

export default WelcomeMessage;
