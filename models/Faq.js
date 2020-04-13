const Sequelize = require('sequelize');
const db = require('../db/connection');

const Faq = db.define('faq', {
    titulo: {
        type:Sequelize.STRING,
    },
    solucao: {
        type:Sequelize.STRING,
    },
    servico: {
        type:Sequelize.STRING,
    },
    email: {
        type:Sequelize.STRING,
    },
    novo: {
        type:Sequelize.INTEGER,
    },
    descricao: {
        type:Sequelize.STRING,
    }
});

module.exports = Faq