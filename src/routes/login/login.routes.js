const router = require ('express').Router()
const {validarJWT} =  require('../../middlewares/validar_jwt')
const controllerLogin = require('../../controllers/usuarios/usuarios.controller')

router.post ('/login',controllerLogin.loginUser)
router.post('/create',validarJWT,controllerLogin.UserCreate)
module.exports= router