const Tasks = require("../models/task");

// Get all items
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Tasks.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching items", error });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body.status;

    if (!["pending", "completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updatedTask = await Tasks.findByIdAndUpdate(
      taskId,
      { status },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Error updating status" });
  }
};

exports.getTaskDetails = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Tasks.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch task", error });
  }
};
