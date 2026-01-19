import { createContext, useReducer, useEffect, useState } from "react";
import {
  addTaskToServer,
  deleteTaskFromServer,
  fetchTasksFromServer,
  updateTaskOnServer,
  updateTaskStatusOnServer,
} from "../services/taskServices";

const TaskContext = createContext({
  tasks: [],
  addTask: () => {},
  deleteTask: () => {},
  updateTask: () => {},
  updateStatus: () => {},
  editingTask: null,
  setEditingTask: () => {},
});

export { TaskContext };

function taskReducer(currTasks, action) {
  switch (action.type) {
    case "LOAD_TASKS":
      return action.payload;

    case "NEW_TASK":
      return [...currTasks, action.payload];

    case "DELETE_TASK":
      return currTasks.filter((task) => task._id !== action.payload.taskId);

    case "UPDATE_TASK":
      return currTasks.map((task) =>
        task._id === action.payload._id ? action.payload : task
      );
    case "UPDATE_STATUS":
      return currTasks.map((task) =>
        task._id === action.payload.taskId
          ? { ...task, status: action.payload.status }
          : task
      );

    default:
      return currTasks;
  }
}

export function TaskContextProvider({ children }) {
  const [tasks, dispatchTasks] = useReducer(taskReducer, []);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const tasksFromServer = await fetchTasksFromServer();
        dispatchTasks({
          type: "LOAD_TASKS",
          payload: tasksFromServer,
        });
      } catch (error) {
        console.error("Failed to load tasks:", error);
      }
    };

    loadTasks();
  }, []);

  const addTask = async (taskData) => {
    try {
      const serverTask = await addTaskToServer(taskData);

      dispatchTasks({
        type: "NEW_TASK",
        payload: serverTask,
      });
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await deleteTaskFromServer(taskId);

      dispatchTasks({
        type: "DELETE_TASK",
        payload: { taskId },
      });
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const updateTask = async (taskId, updatedData) => {
    try {
      const updatedTask = await updateTaskOnServer(taskId, updatedData);

      dispatchTasks({
        type: "UPDATE_TASK",
        payload: updatedTask,
      });
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const updateStatus = async (taskId, currentStatus) => {
    try {
      const newStatus = currentStatus === "pending" ? "completed" : "pending";
      //console.log("taskId, currentStatus", taskId, currentStatus);
      const updatedTask = await updateTaskStatusOnServer(taskId, {
        status: newStatus,
      });

      dispatchTasks({
        type: "UPDATE_STATUS",
        payload: {
          taskId,
          status: updatedTask.status,
        },
      });
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        updateTask,
        editingTask,
        setEditingTask,
        updateStatus,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
