const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const tasksRoutes = require('./routes/tasks');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(tasksRoutes);

app.listen(3000, () => {
    console.log('o servidor está funcionando na porta 3000');
});