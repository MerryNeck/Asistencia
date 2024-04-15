// importar Sequelize
const { Sequelize, DATEONLY } = require('sequelize');

// importar la conexion de la base de datos mediante Sequelize
const { sequelize } = require('./../database/db');
const { Usuario } = require('./usuario.model');

const Pagos= sequelize.define('pago', {
    id_sueldo: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement : true
    },
    sueldo: {
        type: Sequelize.INTEGER
    },
    dias_trabajado: {
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
        type : Sequelize.DATEONLY,
    },
    fecha_modificacion: {
        type : Sequelize.DATEONLY
    }
}, {
    timestamps: false,
    tableName: 'pago'
});

Pagos.belongsTo(Usuario, { foreignKey: 'id_usuario' });
module.exports = {
    Pagos
}
