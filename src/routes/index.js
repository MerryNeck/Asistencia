const router = require('express').Router();
const {validarJWT} =  require('../middlewares/validar_jwt')
///IMPORTACION DE LAS RUTAS

const user = require('./login/login.routes')
const usuarios = require('./usuarios/usuarios.routes')
const excel =  require('./excel/excel.routes')
const asistencia = require('./asistencia/asistencia.routes')
const rol = require('./rol/rol.routes')
const areas = require('./areas/areas.routes')
const pagos = require('./pagos/pagos.routes')
const boleta = require('./boleta/boleta.routes')
/// CREACION DE LAS API

router.use('/user',user)
router.use('/usuarios',usuarios)
router.use('/excel', excel)
router.use('/asistencia',asistencia)
router.use('/rol',rol)
router.use('/area',areas)
router.use('/pago',pagos)
router.use('/boleta',boleta)
module.exports = router;
