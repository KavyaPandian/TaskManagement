const Task = require("../models/Task");
const { validateObjectId } = require("../utils/validation");


// ✅ Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json({
      tasks,
      status: true,
      msg: "Tasks fetched successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
};


// ✅ Get single task
exports.getTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    if (!validateObjectId(taskId)) {
      return res.status(400).json({ status: false, msg: "Invalid Task ID" });
    }

    const task = await Task.findOne({
      _id: taskId,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({ status: false, msg: "Task not found" });
    }

    res.status(200).json({
      task,
      status: true,
      msg: "Task fetched successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
};


// ✅ Create task
exports.postTask = async (req, res) => {
  try {
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({
        status: false,
        msg: "Description is required",
      });
    }

    const task = await Task.create({
      user: req.user.id,
      description,
      status: "pending",
    });

    res.status(201).json({
      task,
      status: true,
      msg: "Task created successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
};


// ✅ Update task (description OR status)
exports.putTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { description, status } = req.body;

    if (!validateObjectId(taskId)) {
      return res.status(400).json({ status: false, msg: "Invalid Task ID" });
    }

    let task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ status: false, msg: "Task not found" });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ status: false, msg: "Unauthorized" });
    }

    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;

    await task.save();

    res.status(200).json({
      task,
      status: true,
      msg: "Task updated successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
};


// ✅ Toggle task status (🔥 IMPORTANT FOR YOUR BUTTON)
exports.toggleTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;

    if (!validateObjectId(taskId)) {
      return res.status(400).json({ status: false, msg: "Invalid Task ID" });
    }

    let task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ status: false, msg: "Task not found" });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ status: false, msg: "Unauthorized" });
    }

    // 🔥 Toggle logic
    task.status = task.status === "pending" ? "completed" : "pending";

    await task.save();

    res.status(200).json({
      task,
      status: true,
      msg: "Task status updated",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
};


// ✅ Delete task
exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    if (!validateObjectId(taskId)) {
      return res.status(400).json({ status: false, msg: "Invalid Task ID" });
    }

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ status: false, msg: "Task not found" });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ status: false, msg: "Unauthorized" });
    }

    await Task.findByIdAndDelete(taskId);

    res.status(200).json({
      status: true,
      msg: "Task deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
};