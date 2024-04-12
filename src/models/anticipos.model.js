// importar Sequelize
const { Sequelize, DATEONLY } = require('sequelize');

// importar la conexion de la base de datos mediante Sequelize
const { sequelize } = require('./../database/db');

const Anticipos= sequelize.define('anticipos', {
    id_anticipo: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement : true
    },
    fecha_creacion: {
        type: Sequelize.DATEONLY
    },
    estado: {
        type: Sequelize.STRING
    },
    anticipos: {
        type: Sequelize.INTEGER
    },
    id_usuario: {
        type: Sequelize.INTEGER
    },
    fecha_modificacion: {
        type : Sequelize.DATE
    }
}, {
    timestamps: false,
    tableName: 'anticipos'
});

module.exports = {
    Anticipos
}
