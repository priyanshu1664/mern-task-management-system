const Tasks = require("../models/task");

exports.getHostTasks = async (req, res) => {
  try {
    const tasks = await Tasks.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { task, date, assigneeEmail } = req.body;

    const taskItem = new Tasks({
      task,
      date,
      assigneeEmail,
    });

    await taskItem.save();
    res.status(201).json(taskItem);
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const deletedTask = await Tasks.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted", deletedTask });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { task, date, assigneeEmail } = req.body;

    const updatedTask = await Tasks.findByIdAndUpdate(
      taskId,
      { task, date, assigneeEmail },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
};

exports.markCompleted = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedItem = await ToDoItem.findByIdAndUpdate(
      id,
      { completed: true },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: "Error updating status", error });
  }
};
