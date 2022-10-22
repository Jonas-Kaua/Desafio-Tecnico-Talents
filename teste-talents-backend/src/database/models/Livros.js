const { Sequelize } = require("sequelize");
const db = require("../../config/database");

const sequelize = new Sequelize(db);

const Livro = sequelize.define('livro', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    isbn:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    authorid:{
        type: Sequelize.INTEGER,
        allowNull: false,
    }
}, {sequelize, timestamps: false, tableName: "livro"});

module.exports = Livro;