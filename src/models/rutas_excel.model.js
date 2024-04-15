// importar Sequelize
const { Sequelize, DATEONLY } = require('sequelize');

// importar la conexion de la base de datos mediante Sequelize
const { sequelize } = require('./../database/db');

const RutasExcel= sequelize.define('rutas_excel', {
    id_excel: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement : true
    },
    rutas_excel: {
        type: Sequelize.STRING
    },
    estado: {
        type: Sequelize.STRING
    },
    fecha_creacion:{
        type : Sequelize.DATEONLY,
    },
    fecha_modificacion: {
        type : Sequelize.DATEONLY
    }
}, {
    timestamps: false,
    tableName: 'rutas_excel'
});

module.exports = {
    RutasExcel
}
