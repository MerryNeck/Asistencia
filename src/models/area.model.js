// importar Sequelize
const { Sequelize, DATEONLY } = require('sequelize');

// importar la conexion de la base de datos mediante Sequelize
const { sequelize } = require('./../database/db');

const Area= sequelize.define('Area', {
    id_area: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement : true
    },
    tipo_area: {
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
    tableName: 'area'
});

module.exports = {
    Area
}
