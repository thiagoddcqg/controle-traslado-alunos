const Sequelize = require('sequelize');
const db = require('./db');

const Usuario = db.define('usuarios', {
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
    tipo: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    tipo: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});

// Criar a tabela
// Usuario.sync({ force: true });
// Usuario.sync({ alter:true });

module.exports = Usuario;