const express = require("express");
const userTaskRouter = express.Router();

const userTaskController = require("../controllers/userTaskController");

// Get Host Tasks
userTaskRouter.get("/", userTaskController.getAllTasks);
userTaskRouter.get("/:taskId", userTaskController.getTaskDetails);

// Update task status (pending → doing → completed)
userTaskRouter.patch("/:taskId/status", userTaskController.updateTaskStatus);

module.exports = userTaskRouter;
