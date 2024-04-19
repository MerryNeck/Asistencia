const router = require ('express').Router()
const {validarJWT} =  require('../../middlewares/validar_jwt')
const ControllerPersonas  = require ('../../controllers/personas/personas.controller')

router.get('',ControllerPersonas.getPersonas)
router.get('/:id',ControllerPersonas.getByIdPersonas),
router.put('/:id',ControllerPersonas.UpdatePersonas)
router.post('/',ControllerPersonas.postPersonas)
router.get('/buscar/:nombre',ControllerPersonas.BuscarPersonas)
router.delete('/:id',ControllerPersonas.DeletePersonas)
module.exports = router