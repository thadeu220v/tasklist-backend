const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/bancodedados')
const app = express();
const tasksRoutes = require('./routes/tasks');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(tasksRoutes);

sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('o servidor está funcionando na porta 3000');
    });
}).catch(err => {
    console.error('Há um problema com o sistema de banco de dados.', err);
});