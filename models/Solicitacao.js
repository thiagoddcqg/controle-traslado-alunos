const Sequelize = require('sequelize');
const db = require('./db');
const destino = require('./Destino');
const veiculo = require('./Veiculo');

const Solicitacao = db.define('solicitacoes', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
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

Solicitacao.belongsTo(destino, {
    foreignKey: 'destinoId', allowNull: false
});

Solicitacao.belongsTo(veiculo, {
    foreignKey: 'veiculoId', allowNull: false
});

module.exports = Solicitacao;