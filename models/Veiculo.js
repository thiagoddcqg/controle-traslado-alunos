const Sequelize = require('sequelize');
const db = require('./db');

const Veiculo = db.define('veiculos', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    ocupacao_max: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});

// Criar a tabela
// Veiculo.sync({ force: true });

module.exports = Veiculo;