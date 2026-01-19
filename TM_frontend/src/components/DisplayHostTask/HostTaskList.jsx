import { useContext } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { TaskContext } from "../../store/taskStore";
import { useNavigate } from "react-router-dom";

function HostTaskList({ item }) {
  const { deleteTask, setEditingTask } = useContext(TaskContext);
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, "0")}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${date.getFullYear()}`;
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    navigate("/add-task");
  };

  return (
    <div className="mx-auto bg-gray-50 rounded-2xl shadow-md p-6 hover:shadow-xl w-full max-w-3xl">
      <div className="flex justify-between ">
        <h3 className="text-xl font-semibold text-gray-800"></h3>
        <div className="flex space-x-2">
          <button
            className="btn btn-warning me-2"
            onClick={() => handleEdit(item)}
          >
            {" "}
            <FaEdit />
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => deleteTask(item._id)}
          >
            {" "}
            <AiFillDelete />{" "}
          </button>
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-800">{item.task}</h3>
      <p className="text-gray-500 mt-2">Due: {formatDate(item.date)}</p>

      <p className="text-gray-400 text-md mt-1">
        Assigned To: {item.assigneeEmail || "N/A"}
      </p>

      <div className="mt-4">
        <span
          className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
            item.completed
              ? "bg-green-100 text-green-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {item.completed ? "Completed" : "Pending"}
        </span>
      </div>
    </div>
  );
}

export default HostTaskList;
