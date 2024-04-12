// importar Sequelize
const { Sequelize, DATEONLY } = require('sequelize');

// importar la conexion de la base de datos mediante Sequelize
const { sequelize } = require('./../database/db');

const Descuentos= sequelize.define('descuentos', {
    id_descuento: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement : true
    },
    anticipos: {
        type: Sequelize.INTEGER
    },
    id_reporte: {
        type: Sequelize.INTEGER
    },
    min_retrasados: {
        type: Sequelize.INTEGER
    },
    faltas: {
        type: Sequelize.INTEGER
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
    tableName: 'descuentos'
});

module.exports = {
    Descuentos
}
