const express = require('express');
const auth = require('../middleware/auth');
const taskController = require('../controllers/taskController');

const router = express.Router();

// Get all tasks for the user
router.get('/', auth, taskController.getAllTasks);

// Get a specific task
router.get('/:id', auth, taskController.getTask);

// Create a new task
router.post('/', auth, taskController.createTask);

// Update a task
router.put('/:id', auth, taskController.updateTask);

// Delete a task
router.delete('/:id', auth, taskController.deleteTask);

module.exports = router; 