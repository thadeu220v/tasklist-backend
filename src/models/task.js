const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/bancodedados');

const Task = sequelize.define('Task', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 255]
        }
    },
    description: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

module.exports = Task;