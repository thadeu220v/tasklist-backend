const Joi = require('joi');
const Task = require('../models/task');

const taskSchema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().optional(),
    status: Joi.boolean().optional()
});

const partialTaskSchema = Joi.object({
    title: Joi.string().min(3).optional(),
    description: Joi.string().optional(),
    status: Joi.boolean().optional()
});


exports.getAllTasks = async (req, res) => {
    try {
        let { page = 1, limit = 10 } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);

        const tasks = await Task.findAll({
            offset: (page - 1) * limit,
            limit: limit
        });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar tarefas', code: 500 });
    }
};

exports.createTask = async (req, res) => {
    const { error, value } = taskSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message, code: 400 });
    }

    try {
        const task = await Task.create(value);
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao criar tarefa', code: 500 });
    }
};

exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) {
            return res.status(404).json({ error: 'A tarefa solicitada não existe', code: 404 });
        }
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar tarefa', code: 500 });
    }
};

exports.updateTask = async (req, res) => {
    const { error, value } = taskSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message, code: 400 });
    }

    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) {
            return res.status(404).json({ error: 'Não encontramos esta tarefa para atualização', code: 404 });
        }
        await task.update(value);
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao atualizar tarefa', code: 500 });
    }
};

exports.partialUpdateTask = async (req, res) => {
    const { error, value } = partialTaskSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message, code: 400 });
    }

    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) {
            return res.status(404).json({ error: 'Não encontramos esta tarefa para atualização', code: 404 });
        }
        await task.update(value);
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao atualizar tarefa', code: 500 });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) {
            return res.status(404).json({ error: 'A tarefa não pode ser deletada porque ela não existe', code: 404 });
        }
        await task.destroy();
        res.status(200).json({ message: 'Tarefa deletada com sucesso', code: 200 });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao deletar tarefa', code: 500 });
    }
};