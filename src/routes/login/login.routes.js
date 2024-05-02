const router = require ('express').Router()
const {validarJWT} =  require('../../middlewares/validar_jwt')
const controllerLogin = require('../../controllers/usuarios/usuarios.controller')

router.post ('/login',controllerLogin.loginUser)
router.post('/create',validarJWT,controllerLogin.UserCreate)
router.put('/:id',validarJWT,controllerLogin.PassUpdate)
router.get('',controllerLogin.getUser)
router.get('/:id',controllerLogin.getUserById)
router.delete('/:id',controllerLogin.deleteUser)
router.get('/buscar/:ci',controllerLogin.searchUser)
module.exports= router