const router = require ('express').Router()
const {validarJWT} =  require('../../middlewares/validar_jwt')

const rolController = require('../../controllers/rol/rol.controller')

router.get('',rolController.getRol)
router.post('',validarJWT,rolController.postRol)
router.get('/:id',rolController.getByIdRol)
router.put('/:id',validarJWT,rolController.putRol)
router.delete('/:id',validarJWT,rolController.deleteRol)

module.exports = router