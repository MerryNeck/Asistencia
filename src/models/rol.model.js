// importar Sequelize
const { Sequelize } = require('sequelize');

// importar la conexion de la base de datos mediante Sequelize
const { sequelize } = require('./../database/db');

const Rol= sequelize.define('rol', {
    id_rol: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement : true
    },
    tipo: {
        type: Sequelize.STRING
    },
    fecha_creacion: {
        type: Sequelize.STRING
    },
    fecha_modificacion: {
        type: Sequelize.STRING
    }

}, {
    timestamps: false,
    tableName: 'rol'
});

module.exports = {
    Rol
}
