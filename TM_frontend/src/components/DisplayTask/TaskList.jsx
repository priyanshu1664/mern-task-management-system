import { useContext } from "react";
import { FaEye } from "react-icons/fa";
import { TaskContext } from "../../store/taskStore";
import { useNavigate } from "react-router-dom";

function TaskList({ item }) {
  const { updateStatus } = useContext(TaskContext);
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, "0")}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${date.getFullYear()}`;
  };

  const handleDisplayDetails = () => {
    navigate(`/task-details/${item._id}`);
  };

  const handleToggleStatus = () => {
    updateStatus(item._id, item.status);
  };

  return (
    <div className="p-4">
      <div className="mx-auto bg-gray-50 rounded-2xl shadow-md p-6 hover:shadow-xl w-full max-w-3xl">
        <h3 className="text-xl font-semibold text-gray-800">{item.task}</h3>

        <p className="text-gray-500 mt-2">Due: {formatDate(item.date)}</p>

        <p className="text-gray-400 mt-1">
          Assigned To: {item.assigneeEmail || "N/A"}
        </p>

        {/* STATUS BADGE */}
        <div className="mt-4">
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              item.status === "completed"
                ? "bg-green-100 text-green-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {item.status === "completed" ? "Completed" : "Pending"}
          </span>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-end mt-5 space-x-3">
          {/* View Details */}
          <button
            onClick={handleDisplayDetails}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl transition"
          >
            <FaEye />
            View
          </button>

          {/* Toggle Status */}
          <button
            onClick={handleToggleStatus}
            className={`px-4 py-2 rounded-xl text-white transition ${
              item.status === "pending"
                ? "bg-green-500 hover:bg-green-600"
                : "bg-gray-400 hover:bg-gray-500"
            }`}
          >
            {item.status === "pending" ? "Mark Completed" : "Mark Pending"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskList;
