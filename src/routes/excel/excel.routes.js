const router = require ('express').Router()
const {validarJWT} =  require('../../middlewares/validar_jwt')
var multipart = require('connect-multiparty'); 
var path = multipart({uploadDir: './src/uploads'});
const ControllerExcel =  require('../../controllers/excel/excel.controller')

router.post('/',validarJWT,path,ControllerExcel.postExcel)
router.get('/',ControllerExcel.getExcel)
router.get('/:id',ControllerExcel.getByIdExcel)
router.put('/:id',validarJWT,ControllerExcel.putExcel),
router.delete('/:id',validarJWT,ControllerExcel.deleteExcel)
module.exports = router