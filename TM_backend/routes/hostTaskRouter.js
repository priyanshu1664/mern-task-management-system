const express = require("express");
const hostTaskRouter = express.Router();

const hostTaskController = require("../controllers/hostTaskController");

/* hostTaskRouter.use((req, res, next) => {
  console.log("HOST ROUTE HIT:", req.method, req.originalUrl);
  next();
}); */

// Add Task
hostTaskRouter.post("/", hostTaskController.createTask);

// Get Host Tasks
hostTaskRouter.get("/", hostTaskController.getHostTasks);

// Edit Task
hostTaskRouter.put("/:taskId", hostTaskController.updateTask);

// Delete Task
hostTaskRouter.delete("/:taskId", hostTaskController.deleteTask);

module.exports = hostTaskRouter;
