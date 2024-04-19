// importar Sequelize
const { Sequelize } = require('sequelize');

// importar la conexion de la base de datos mediante Sequelize
const { sequelize } = require('./../database/db');

const Login= sequelize.define('autentificacion', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
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
        type: Sequelize.STRING
    },
    fecha_modificacion: {
        type: Sequelize.STRING
    },id_usuario: {
        type: Sequelize.INTEGER
    },

}, {
    timestamps: false,
    tableName: 'autentificacion'
});

module.exports = {
    Login
}
