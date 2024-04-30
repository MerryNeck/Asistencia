// importar Sequelize
const { Sequelize, DATEONLY } = require('sequelize');

// importar la conexion de la base de datos mediante Sequelize
const { sequelize } = require('./../database/db');
const { Usuario } = require('./usuario.model');

const Asistencia= sequelize.define('asistencia', {
    id_asistencia: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement : true
    },

    fecha: {
        type: Sequelize.STRING
    },
    id_excel: {
        type: Sequelize.INTEGER
    },
    tprano_ingreso: {
        type: Sequelize.STRING
    },
    tde_ingreso : {
        type: Sequelize.STRING
    },
    min_retardo  :{
        type: Sequelize.STRING
    },
    min_adelantado: {
        type: Sequelize.STRING
    },
    faltas : {
        type: Sequelize.STRING
    },
    total_horas :{
        type: Sequelize.STRING
    },
    tprano_salida : {
        type: Sequelize.STRING
    },
    tde_salida : {
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
    },
    id_usuario : {
        type : Sequelize.INTEGER
    },
    min_extra : {
        type : Sequelize.STRING
    },
    hrs_no_recuperadas : {
        type : Sequelize.STRING
    },
    usuario_id : {
        type : Sequelize.INTEGER
    }
}, {
    timestamps: false,
    tableName: 'asistencia'
});
Asistencia.belongsTo(Usuario, { foreignKey: 'usuario_id' });
module.exports = {
    Asistencia
}
