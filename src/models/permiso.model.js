// importar Sequelize
const { Sequelize, DATEONLY } = require('sequelize');

// importar la conexion de la base de datos mediante Sequelize
const { sequelize } = require('./../database/db');

const Permiso= sequelize.define('permiso', {
    id_permiso: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement : true
    },
    fecha: {
        type: Sequelize.STRING
    },
    min_permiso: {
        type: Sequelize.STRING
    },
    detalle: {
        type: Sequelize.STRING
    },
    id_usuario:{
        type : Sequelize.INTEGER,
    },
}, {
    timestamps: false,
    tableName: 'permiso'
});

module.exports = {
    Permiso
}
