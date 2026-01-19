import { useContext } from "react";
import { TaskContext } from "../../store/taskStore";

function TaskDetails() {
  const { tasks } = useContext(TaskContext);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  if (!tasks || tasks.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <h3 className="text-gray-500 text-lg font-medium">
          No tasks available
        </h3>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {tasks.map((task) => (
        <div
          key={task._id}
          className="bg-white rounded-xl shadow-lg p-5 flex flex-col justify-between hover:scale-105 transition-transform duration-300"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {task.task}
          </h2>
          <p className="text-gray-500 mb-2">Due: {formatDate(task.date)}</p>
          {task.assigneeEmail && (
            <p className="text-gray-400 text-sm">
              Assigned to: {task.assigneeEmail}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default TaskDetails;
