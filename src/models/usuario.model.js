// importar Sequelize
const { Sequelize, DATEONLY, INTEGER } = require('sequelize');

// importar la conexion de la base de datos mediante Sequelize
const { sequelize } = require('./../database/db');
const { Rol } = require('./rol.model');

const Usuario= sequelize.define('usuario', {
    id_usuario: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement : true
    },
    nombre: {
        type: Sequelize.STRING
    },
    apellido_paterno: {
        type: Sequelize.STRING
    },
    apellido_materno: {
        type: Sequelize.STRING
    },
    ci: {
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
    id_rol:{
        type : Sequelize.INTEGER
    },
    id_area  :{
        type : Sequelize.INTEGER
    }
}, {
    timestamps: false,
    tableName: 'usuario'
});
Usuario.belongsTo(Rol, { foreignKey: 'id_rol' });

module.exports = {
    Usuario
}
