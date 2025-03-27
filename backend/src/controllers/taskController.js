const Task = require('../models/Task');

const taskController = {
  // Get all tasks for the user
  getAllTasks: async (req, res) => {
    try {
      const tasks = await Task.find({ user: req.user._id })
        .sort({ createdAt: -1 });
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching tasks' });
    }
  },

  // Get a specific task
  getTask: async (req, res) => {
    try {
      const task = await Task.findOne({
        _id: req.params.id,
        user: req.user._id
      });

      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }

      res.json(task);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching task' });
    }
  },

  // Create a new task
  createTask: async (req, res) => {
    try {
      const task = new Task({
        ...req.body,
        user: req.user._id
      });

      await task.save();
      res.status(201).json(task);
    } catch (error) {
      res.status(400).json({ error: 'Error creating task' });
    }
  },

  // Update a task
  updateTask: async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'description', 'status', 'priority', 'dueDate'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).json({ error: 'Invalid updates' });
    }

    try {
      const task = await Task.findOne({
        _id: req.params.id,
        user: req.user._id
      });

      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }

      updates.forEach(update => task[update] = req.body[update]);
      await task.save();

      res.json(task);
    } catch (error) {
      res.status(400).json({ error: 'Error updating task' });
    }
  },

  // Delete a task
  deleteTask: async (req, res) => {
    try {
      const task = await Task.findOneAndDelete({
        _id: req.params.id,
        user: req.user._id
      });

      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }

      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting task' });
    }
  }
};

module.exports = taskController; 