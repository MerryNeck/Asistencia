const AnticipoController = require('../../controllers/anticipos/anticipos.controller')

const router = require ('express').Router()
const {validarJWT} =  require('../../middlewares/validar_jwt')


router.post('',validarJWT,AnticipoController.postAnticipo)
router.get('',AnticipoController.getAnticipo)
router.get('/:id',AnticipoController.getByIdAnticipo)
router.get('/buscar/:ci',AnticipoController.getBuscarAnticipo)
router.put('/:id',validarJWT,AnticipoController.putAnticipo)
router.delete('/:id',validarJWT,AnticipoController.deleteAnticipo)
router.post('/buscar',validarJWT,AnticipoController.searchAnticipo)

module.exports = router