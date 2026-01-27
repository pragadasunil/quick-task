const Task = require("../models/Task");
const mongoose = require("mongoose");


// CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      userId: req.user.id,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to create task" });
  }
};

// GET ALL TASKS (with filters)
exports.getTasks = async (req, res) => {
  try {
    const query = { userId: req.user.id };

    if (req.query.status) query.status = req.query.status;
    if (req.query.priority) query.priority = req.query.priority;
    if (req.query.search) {
      query.title = { $regex: req.query.search, $options: "i" };
    }

    const sortBy = req.query.sort || "createdAt";

    const tasks = await Task.find(query).sort({ [sortBy]: 1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

// UPDATE TASK
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to update task" });
  }
};

// DELETE TASK
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task" });
  }
};

exports.getTaskStats = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const total = await Task.countDocuments({ userId });
    const completed = await Task.countDocuments({
      userId,
      status: "Completed",
    });

    const pending = total - completed;

    const priorityStats = await Task.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: "$priority",
          count: { $sum: 1 },
        },
      },
    ]);

    const priorityBreakdown = {};
    priorityStats.forEach((item) => {
      priorityBreakdown[item._id] = item.count;
    });

    res.json({
      total,
      completed,
      pending,
      completionRate: total === 0 ? 0 : Math.round((completed / total) * 100),
      priorityBreakdown,
    });
  } catch (error) {
    console.error("STATS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
};
