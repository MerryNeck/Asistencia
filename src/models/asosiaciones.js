const { Anticipos } = require('./anticipos.model')

const { Area } = require('./area.model')
const { Asistencia } = require('./asistencia.model')
const { Autentificacion } = require('./autentificacion.model')
const { BoletaPago } = require('./boleta_pago.model')
const { Boleta } = require('./boleta.model')
const { Descuentos } = require('./descuentos.model')
const { Pago } = require('./pago.model')
const { Permiso } = require('./permiso.model')
const { Rol } = require('./rol.model')
const { RutasExcel } = require('./rutas_excel.model')
const { Usuario } = require('./usuario.model')


/// Relaciones en los diferentes modelos en funcion a la base de datos 

Anticipos.belongsTo(
    Usuario, {
    foreingKey: 'id_usuario',
    sourceKey: 'id_usuario'
});
Usuario.belongsTo(
    Autentificacion, {
    foreingKey: 'id_usuario',
    sourceKey: 'id_usuario'
});
Permiso.belongsTo(
    Usuario, {
    foreingKey: 'id_usuario',
    sourceKey: 'id_usuario'
});
RutasExcel.belongsTo(
    Usuario, {
    foreingKey: 'id_usuario',
    sourceKey: 'id_usuario'
});
Area.belongsTo(
    Usuario, {
    foreingKey: 'id_area',
    sourceKey: 'id_area'
});
Rol.belongsTo(
    Usuario, {
    foreingKey: 'id_rol',
    sourceKey: 'id_rol'
});
Pago.belongsTo(
    Usuario, {
    foreingKey: 'id_usuario',
    sourceKey: 'id_usuario'
});
Asistencia.belongsTo(
    RutasExcel, {
    foreingKey: 'id_excel',
    sourceKey: 'id_excel'
});
Boleta.belongsTo(
    Asistencia, {
    foreingKey: 'id_asistencia',
    sourceKey: 'id_asistencia'
});
Pago.belongsTo(
    Boleta, {
    foreingKey: 'id_pago',
    sourceKey: 'id_sueldo'
});
BoletaPago.belongsTo(
    Asistencia, {
    foreingKey: 'id_asistencia',
    sourceKey: 'id_asistencia'
});
Descuentos.belongsTo(
    Asistencia, {
    foreingKey: 'id_reporte',
    sourceKey: 'id_asistencia'
});
