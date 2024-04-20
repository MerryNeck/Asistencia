const router = require ('express').Router()
const {validarJWT} =  require('../../middlewares/validar_jwt')

const rolController = require('../../controllers/rol/rol.controller')

router.get('',rolController.getRol)
router.post('/',rolController.postRol)
router.get('/:id',rolController.getByIdRol)
router.put('/:id',rolController.putRol)
router.delete('/:id',rolController.deleteRol)

module.exports = router