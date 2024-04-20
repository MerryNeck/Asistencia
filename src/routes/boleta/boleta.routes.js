const router = require ('express').Router()
const BoletaController = require('../../controllers/boleta/boleta.controller')


router.get('/',BoletaController.getBoleta)
router.post('/',BoletaController.postBoleta)
router.get('/:id',BoletaController.getByIdBoleta)
router.put('/',BoletaController.putBoleta)
router.delete('/',BoletaController.deleteBoleta)
router.post('/buscar/',BoletaController.searchByCiBoleta)

module.exports= router