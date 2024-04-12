// importar Sequelize
const { Sequelize, DATEONLY } = require('sequelize');

// importar la conexion de la base de datos mediante Sequelize
const { sequelize } = require('./../database/db');

const BoletaPago= sequelize.define('boleta_pago', {
    nro_boleta: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement : true
    },
    liquido_pagable: {
        type: Sequelize.INTEGER
    },
    id_asistencia: {
        type: Sequelize.INTEGER
    },
    observacion: {
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
    tableName: 'boleta_pago'
});

module.exports = {
    BoletaPago
}
