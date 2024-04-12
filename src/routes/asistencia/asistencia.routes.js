const router = require ('express').Router()
const {validarJWT} =  require('../../middlewares/validar_jwt')
const ControllerAsistencia = require('../../controllers/asistencia/asistencia.controller')
router.get('',ControllerAsistencia.getAsistencia)
router.post('/buscar',ControllerAsistencia.getByCiOrDate)
router.get('/:id',ControllerAsistencia.getById)
router.put('/actualizar/:id',validarJWT,ControllerAsistencia.putAsitencia)
module.exports = router