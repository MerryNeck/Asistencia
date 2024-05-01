// importar Sequelize
const { Sequelize, DATEONLY } = require('sequelize');

// importar la conexion de la base de datos mediante Sequelize
const { sequelize } = require('./../database/db');

const Anticipos= sequelize.define('anticipos', {
    id_anticipo: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement : true
    },id_usuario: {
        type: Sequelize.INTEGER
    },
    fecha: {
        type: Sequelize.STRING
    },
    fecha_creacion: {
        type: Sequelize.DATEONLY
    },
    estado: {
        type: Sequelize.STRING
    },
    anticipos: {
        type: Sequelize.INTEGER
    },
    fecha_modificacion: {
        type : Sequelize.DATE
    },
    detalle: {
        type : Sequelize.STRING
    }
}, {
    timestamps: false,
    tableName: 'anticipos'
});

module.exports = {
    Anticipos
}
