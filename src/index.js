const express = require('express');
const app = express();

const tasksToDo = [];

// rota de tarefas
app.get('/tasks', (req, res) => {
return tasksToDo;    
})

// rota de pesquisa de tarefas por ID
// app.get('/tasks/:id', (req, res) => {

// })

app.listen(3000);