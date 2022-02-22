const Sequelize = require('sequelize');
const db = require('./db');

const Solicitacao = db.define('solicitacoes', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    usuarioId: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    data: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    turno: {
        type: Sequelize.CHAR,
        allowNull: false,
    },
    destinoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    veiculoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});

// Criar a tabela
// Solicitacao.sync({ force: true });

module.exports = Solicitacao;