const Sequelize = require('sequelize');
const db = require('./db');

const Destino = db.define('destinos', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    sigla: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

// Criar a tabela
// Destino.sync({ force: true });

module.exports = Destino;