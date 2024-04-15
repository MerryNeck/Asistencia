const router = require ('express').Router()
const PagosController = require('../../controllers/pagos/pagos.controller')
const {validarJWT} =  require('../../middlewares/validar_jwt')

router.get('/',PagosController.getPagos)
router.get('/:id',PagosController.getByIdPagos)
router.post('',validarJWT,PagosController.PostPagos)
router.put('/:id',validarJWT,PagosController.PutPagos)
router.delete('/:id',validarJWT,PagosController.deletePagos)
router.get('/buscar/:ci',PagosController.searchPagos)

module.exports = router
