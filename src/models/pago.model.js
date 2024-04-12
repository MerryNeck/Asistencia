// importar Sequelize
const { Sequelize, DATEONLY } = require('sequelize');

// importar la conexion de la base de datos mediante Sequelize
const { sequelize } = require('./../database/db');

const Pago= sequelize.define('pago', {
    id_sueldo: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement : true
    },
    sueldo: {
        type: Sequelize.INTEGER
    },
    dias_trabajo: {
        type: Sequelize.INTEGER
    },
    retencion: {
        type: Sequelize.INTEGER
    },
    sueldo_bruto: {
        type: Sequelize.INTEGER
    },
    id_usuario  :{
        type : Sequelize.INTEGER
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
    tableName: 'pago'
});

module.exports = {
    Pago
}
