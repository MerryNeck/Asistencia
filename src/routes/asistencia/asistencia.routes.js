const router = require ('express').Router()
const {validarJWT} =  require('../../middlewares/validar_jwt')
const ControllerAsistencia = require('../../controllers/asistencia/asistencia.controller')
router.get('',validarJWT,ControllerAsistencia.getAsistencia)
router.post('/buscar',validarJWT,ControllerAsistencia.getByCiOrDate)
router.get('/:id',validarJWT,ControllerAsistencia.getById)
router.put('/actualizar/:id',validarJWT,ControllerAsistencia.putAsitencia)
module.exports = router