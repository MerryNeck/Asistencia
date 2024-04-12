// importar Sequelize
const { Sequelize } = require('sequelize');

// importar la conexion de la base de datos mediante Sequelize
const { sequelize } = require('./../database/db');
const { Usuario } = require('./usuario.model');

const Autentificacion= sequelize.define('autentificacion', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement  : true
    },
    correo_corp: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    estado: {
        type: Sequelize.STRING
    },
    fecha_creacion: {
        type: Sequelize.DATE
    },
    fecha_modificacion: {
        type: Sequelize.DATE
    },id_usuario: {
        type: Sequelize.INTEGER
    },

}, {
    timestamps: false,
    tableName: 'autentificacion'
});
Autentificacion.belongsTo(Usuario, { foreignKey: 'id_usuario' });
module.exports = {
    Autentificacion
}
