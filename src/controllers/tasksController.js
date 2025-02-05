const Task = require('../models/task');

let tasksToDo = [];
let tasksCount = 1;

exports.getAllTasks = (req, res) => {
    res.json(tasksToDo);
};

exports.createTask = (req, res) => {
    let body = req.body;

    if (!body.title || body.title.length <= 3) {
        return res.status(400).send('Titulo obrigatório deve ser maior que 3 caracteres');
    }

    if (body.status !== undefined && typeof body.status !== 'boolean') {
        return res.status(400).send('O status deve ser true ou false, do tipo boolean.');
    }

    let task = new Task(tasksCount++, body.title, body.description, body.status);
    tasksToDo.push(task);
    res.status(201).json(task);
};

exports.getTaskById = (req, res) => {
    let task = tasksToDo.find(tarefa => tarefa.id === parseInt(req.params.id));
    if (!task) {
        return res.status(404).send('A tarefa solicitada não existe');
    }
    res.json(task);
};

exports.updateTask = (req, res) => {
    let task = tasksToDo.find(tarefa => tarefa.id === parseInt(req.params.id));
    if (!task) {
        return res.status(404).send('Não encontramos esta tarefa para atualização');
    }

    let body = req.body;

    if (body.title && body.title.length <= 3) {
        return res.status(400).send('Titulo obrigatório deve ser maior que 3 caracteres');
    }

    if (body.status !== undefined && typeof body.status !== 'boolean') {
        return res.status(400).send('O status deve ser true ou false, do tipo boolean.');
    }

    if (body.title) task.title = body.title;
    if (body.description) task.description = body.description;
    if (body.status !== undefined) task.status = body.status;

    res.status(200).json(task);
};

exports.partialUpdateTask = (req, res) => {
    let task = tasksToDo.find(tarefa => tarefa.id === parseInt(req.params.id));
    if (!task) {
        return res.status(404).send('Não encontramos esta tarefa para atualização');
    }

    let body = req.body;

    if (body.title && body.title.length <= 3) {
        return res.status(400).send('Titulo obrigatório deve ser maior que 3 caracteres');
    }

    if (body.status !== undefined && typeof body.status !== 'boolean') {
        return res.status(400).send('O status deve ser true ou false, do tipo boolean.');
    }

    if (body.title) task.title = body.title;
    if (body.description) task.description = body.description;
    if (body.status !== undefined) task.status = body.status;

    res.status(200).json(task);
};

exports.deleteTask = (req, res) => {
    let taskIndex = tasksToDo.findIndex(tarefa => tarefa.id === parseInt(req.params.id));
    if (taskIndex === -1) {
        return res.status(404).send('A tarefa não pode ser deletada porque ela não existe');
    }

    tasksToDo.splice(taskIndex, 1);
    res.status(200).send('Tarefa deletada com sucesso');
};