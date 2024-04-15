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
        type: Sequelize.DATE
    },
    fecha_modificacion: {
        type: Sequelize.DATE
    },
    estado : {
        type : Sequelize.STRING
    }
}, {
    timestamps: false,
    tableName: 'rol'
});

module.exports = {
    Rol
}
