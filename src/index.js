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

// rota de pesquisa de tarefas por ID
app.get('/tasks/:id', (req, res) => {
    const task = tasksToDo.find(tarefa => tarefa.id === parseInt(req.params.id));
    if (!task) {
        return res.status(404).send('A tarefa solicitada não existe');
    }
    res.json(task);
});

// rota de criação de task
app.post('/tasks', (req, res) => {
    let body = req.body;
    
    
    if (!body.title || body.title.length <= 3) {
        return res.status(400).send('Titulo obrigatório deve ser maior que 3 caracteres');
    }


if(typeof body.status !== 'boolean') {
    res.status(400).send('O status deve ser true ou false, do tipo boolean.')
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

app.listen(3000, () => {
    console.log('o servidor está funcionando na porta 3000');
});