const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let tasksToDo = [];
let tasksCount = 1;

// rota de tarefas
app.get('/tasks', (req, res) => {
    res.json(tasksToDo);
});



// rota de criação de task
app.post('/tasks', (req, res) => {
    let body = req.body;
    
    
    if (!body.title || body.title.length <= 3) {
        return res.status(400).send('Titulo obrigatório deve ser maior que 3 caracteres');
    }


    if (body.status !== undefined && typeof body.status !== 'boolean') {
        return res.status(400).send('O status deve ser true ou false, do tipo boolean.');
    }

    let task = {
        id: tasksCount++,
        title: body.title,
        description: body.description || '', 
        status: body.status
    };

    tasksToDo.push(task);
    res.status(201).json(task);
});

// rota de pesquisa de tarefas por ID
app.get('/tasks/:id', (req, res) => {
    let task = tasksToDo.find(tarefa => tarefa.id === parseInt(req.params.id));
    if (!task) {
        return res.status(404).send('A tarefa solicitada não existe');
    }
    res.json(task);
});

// rota para edição de task criada
app.put('/tasks/:id', (req, res) => {
    let task = tasksToDo.find(tarefa => tarefa.id === parseInt(req.params.id));
    if(!task) {
        res.status(404).send('Não encontramos esta tarefa para atualização');
    }

let body = req.body;

if (body.title && body.title.length <= 3) {
    return res.status(400).send('Titulo obrigatório deve ser maior que 3 caracteres');
}


if (body.status !== undefined && typeof body.status !== 'boolean') {
    return res.status(400).send('O status deve ser true ou false, do tipo boolean.');
}

// Atualiza os campos da tarefa
if (body.title) task.title = body.title;
if (body.description) task.description = body.description;
if (body.status !== undefined) task.status = body.status;

res.status(200).json(task);
});

// rota para atualização parcial patch dos campos da tarefa
app.patch('/tasks/:id', (req, res) => {
    let task = tasksToDo.find(tarefa => tarefa.id === parseInt(req.params.id));
    if(!task) {
        res.status(404).send('Não encontramos esta tarefa para atualização');
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
});

app.delete('/tasks/:id', (req, res) => {
    let task = tasksToDo.find(tarefa => tarefa.id === parseInt(req.params.id));
    let taskIndex = tasksToDo.findIndex(tarefa => tarefa.id === task);
    if(!task ===-1) {
        res.status(404).send('a tarefa não pode ser deletada porque ela não existe');
    }

    tasksToDo.splice(taskIndex, 1);
    res.status(200).send('Tarefa deletada com sucesso');
})

app.listen(3000, () => {
    console.log('o servidor está funcionando na porta 3000');
});