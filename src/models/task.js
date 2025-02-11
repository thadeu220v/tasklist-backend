const { dataTypes } = require ('sequelize');
const sequelize = require('..')

class Task {
    constructor(id, title, description = '', status = false) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
    }
}

module.exports = Task;