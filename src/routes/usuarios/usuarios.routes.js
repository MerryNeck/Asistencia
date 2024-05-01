const router = require ('express').Router()
const {validarJWT} =  require('../../middlewares/validar_jwt')
const ControllerPersonas  = require ('../../controllers/personas/personas.controller')

router.get('',ControllerPersonas.getPersonas)
router.get('/:id',ControllerPersonas.getByIdPersonas),
router.put('/:id',validarJWT,ControllerPersonas.UpdatePersonas)
router.post('',validarJWT,ControllerPersonas.postPersonas)
router.get('/buscar/:ci',ControllerPersonas.BuscarPersonas)
router.delete('/:id',validarJWT,ControllerPersonas.DeletePersonas)
module.exports = router