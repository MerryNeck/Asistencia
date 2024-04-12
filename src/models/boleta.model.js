// importar Sequelize
const { Sequelize, DATEONLY } = require('sequelize');

// importar la conexion de la base de datos mediante Sequelize
const { sequelize } = require('./../database/db');

const Boleta= sequelize.define('boleta', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement : true
    },
    id_pago: {
        type: Sequelize.INTEGER
    },
    id_asistencia: {
        type: Sequelize.INTEGER
    },
    periodo_pago: {
        type: Sequelize.STRING
    },
    fecha_pago: {
        type: Sequelize.STRING
    },
    estado: {
        type: Sequelize.STRING
    },
    fecha_creacion:{
        type : Sequelize.DATE,
    },
    fecha_modificacion: {
        type : Sequelize.DATE
    }
}, {
    timestamps: false,
    tableName: 'boleta'
});

module.exports = {
    Boleta
}
