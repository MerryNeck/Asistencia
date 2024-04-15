const router = require ('express').Router()
const AreaController = require('../../controllers/area/area.controller')
const {validarJWT} =  require('../../middlewares/validar_jwt')

router.post('/',AreaController.postAreas)
router.get('',AreaController.getAreas)
router.get('/:id',AreaController.getByIdAreas)
router.put('/:id',AreaController.putAreas)
router.delete('/:id',AreaController.deleteAreas)

module.exports = router