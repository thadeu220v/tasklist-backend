const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');

router.get('/tasks', tasksController.getAllTasks);
router.post('/tasks', tasksController.createTask);
router.get('/tasks/:id', tasksController.getTaskById);
router.put('/tasks/:id', tasksController.updateTask);
router.patch('/tasks/:id', tasksController.partialUpdateTask);
router.delete('/tasks/:id', tasksController.deleteTask);

module.exports = router;