import React, { useRef, useContext, useEffect } from "react";
import { TaskContext } from "../../store/taskStore";

function AddTask() {
  const { addTask, updateTask, editingTask, setEditingTask } =
    useContext(TaskContext);

  const taskNameRef = useRef();
  const dueDateRef = useRef();
  const userEmailRef = useRef();

  /* ===== PREFILL FORM WHEN EDITING ===== */
  useEffect(() => {
    if (editingTask) {
      taskNameRef.current.value = editingTask.task;
      dueDateRef.current.value = new Date(editingTask.date)
        .toISOString()
        .split("T")[0];
      userEmailRef.current.value = editingTask.assigneeEmail || "";
    }
  }, [editingTask]);

  /* ===== SUBMIT HANDLER ===== */
  const handleSubmit = (e) => {
    e.preventDefault();

    const taskName = taskNameRef.current.value.trim();
    const dueDate = dueDateRef.current.value;
    const assigneeEmail = userEmailRef.current.value.trim();

    if (!taskName || !dueDate || !assigneeEmail) {
      alert("Please fill all fields!");
      return;
    }

    const taskData = {
      task: taskName,
      date: dueDate,
      assigneeEmail,
      status: "pending",
    };

    if (editingTask) {
      updateTask(editingTask._id, taskData);
      setEditingTask(null);
    } else {
      addTask(taskData);
    }

    // Clear form
    taskNameRef.current.value = "";
    dueDateRef.current.value = "";
    userEmailRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-6">
      <div className="bg-gray-50 w-full max-w-4xl rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          {editingTask ? "Edit Task" : "Create New Task"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          {/* Task Name */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-1 font-medium">
              Task Name
            </label>
            <input
              ref={taskNameRef}
              type="text"
              placeholder="Enter task title"
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Due Date
            </label>
            <input
              ref={dueDateRef}
              type="date"
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          {/* Assign Email */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Assign To (User Email)
            </label>
            <input
              ref={userEmailRef}
              type="email"
              placeholder="user@example.com"
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          {/* Submit */}
          <div className="md:col-span-4 mt-4">
            <button
              type="submit"
              className={`w-full py-3 rounded-xl text-white font-semibold transition ${
                editingTask
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-indigo-500 hover:bg-indigo-600"
              }`}
            >
              {editingTask ? "Update Task" : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTask;
