const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  task: { type: String, required: true, trim: true },
  date: { type: Date, required: true },
  assigneeEmail: { type: String, required: true }, // assigned user
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
});

module.exports = mongoose.model("Task", taskSchema);
