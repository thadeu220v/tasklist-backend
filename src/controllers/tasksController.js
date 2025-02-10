const Joi = require('joi');
const Task = require('../models/task');

let tasksToDo = [];
let tasksCount = 1;

const taskSchema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().optional(),
    status: Joi.boolean().optional()
});

exports.getAllTasks = (req, res) => {
    res.json(tasksToDo);
};

exports.createTask = (req, res) => {
    const { error, value } = taskSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let task = new Task(tasksCount++, value.title, value.description, value.status);
    tasksToDo.push(task);
    res.status(201).json(task);
};

exports.getTaskById = (req, res) => {
    let task = tasksToDo.find(tarefa => tarefa.id === parseInt(req.params.id));
    if (!task) {
        return res.status(404).json({ erro: 'A tarefa solicitada não existe', code: 404 });
    }
    res.json(task);
};

exports.updateTask = (req, res) => {
    let task = tasksToDo.find(tarefa => tarefa.id === parseInt(req.params.id));
    if (!task) {
        return res.status(404).json({ error: 'Não encontramos esta tarefa para atualização', code: 404 });
    }

    const { error, value } = taskSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message, code: 400 });
    }

    if (value.title) task.title = value.title;
    if (value.description) task.description = value.description;
    if (value.status !== undefined) task.status = value.status;

    res.status(200).json(task);
};

exports.partialUpdateTask = (req, res) => {
    const { error, value } = taskSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message, code: 400 });
    }

    let task = tasksToDo.find(tarefa => tarefa.id === parseInt(req.params.id));
    if (!task) {
        return res.status(404).json({ error: 'Não encontramos esta tarefa para atualização', code: 404 });
    }

    if (value.title) task.title = value.title;
    if (value.description) task.description = value.description;
    if (value.status !== undefined) task.status = value.status;

    res.status(200).json(task);
};

exports.deleteTask = (req, res) => {
    let taskIndex = tasksToDo.findIndex(tarefa => tarefa.id === parseInt(req.params.id));
    if (taskIndex === -1) {
                return res.status(404).json({ error: 'A tarefa não pode ser deletada porque ela não existe', code: 404 });
    }

    tasksToDo.splice(taskIndex, 1);
    res.status(200).json({ message: 'Tarefa deletada com sucesso', code: 200 });
};