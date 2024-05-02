// importamos response y request de express
const { request = req, response = res } = require('express');
//importamos modelo
const { Autentificacion } = require('../../models/autentificacion.model')
const { Usuario } = require('../../models/usuario.model')
const pool = require('../../database/db')
const bcryptjs = require('bcryptjs');
const { createTocken } = require('../../helpers/jwt');
const { Rol } = require('../../models/rol.model');
class controllerLogin {
    static async loginUser(req, res) {
        try {
            console.log(req.body);
            const data = req.body;
            if (data.email == null && data.password == null) {
                return (res.status(400).json({
                    message: 'no existe datos'
                }))
            }
            const usuarios = await Autentificacion.findAll({
                where: {
                    correo_corp: data.email,

                },
                include: [{
                    model: Usuario,
                    include: {
                        model: Rol
                    }
                }]
            })

            if (usuarios.length == 0) {
                return (res.status(404).json({
                    message: 'No existen registros'
                }))
            }
            const user = usuarios[0];
            //console.log(user);
            //console.log( "data=",data.password, "user=", user.password);
            bcryptjs.compare(data.password, user.password, function (err, result) {
                
                if (err) {
                    console.error(err);
                } else {
                    //console.log(result);
                    if (result) {

                        console.log(result);
                        if (user.estado === 's') {
                            const token = createTocken(user, user.usuario.rol.tipo)

                            return (res.status(200).send({
                                data: user,
                                ok: true,
                                msg: 'Usuario habilitado',
                                token: token,
                                rol: user.usuario.rol.tipo
                            }))
                        } else {
                            return (res.status(401).json({
                                msg: 'Usuario invalido',
                                ok: false
                            }))


                        }
                    } else {
                        return (res.status(401).json({
                            msg: 'Contraseña incorrecta',
                            ok: false
                        }))
                    }

                }
            });
            //console.log(result.rows);

        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: error.message
            })
        }
    }
    static async UserCreate(req, res) {
        const { id_usuario, correo_corp, password } = req.body
        console.log("envio de frond",req.body);
        try {
            ///verificamos los datos del usuario que llamo la peticion
            //console.log(req.usuario);
            if (req.usuario.rol != 'admin') {
                return res.status(420).json({
                    ok: false,
                    msg: 'No tiene acceso a este espacio'
                })
            }
            ///verificamos las condiciones del usuario
            const user = await Usuario.findByPk(id_usuario)
            if (!user) {
                return res.status(404).json({
                    msg: 'No se encontro el Usuario',
                    ok: false
                })
            }
            if (user.estado === 'n') {
                return res.status(403).json({
                    msg: 'Usuario inhabilitado',
                    ok: false
                })
            }
            ///creamos al nuevo usuario con contraseña encriptada
            //encriptamos la contraseña
           const hashedPassword = bcryptjs.hashSync(password, 10);
            //console.log('Contraseña encriptada:', hashedPassword);

            //guardamos los datos en la base de  datos
            const datos = await Autentificacion.create({
                id_usuario: id_usuario,
                correo_corp,
                password: hashedPassword,
                fecha_creacion: new Date(),
                estado: 's'
            })
            res.status(200).json({
                ok: true,
                msg: 'Usuario creado correctamente',
                data: datos
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                msg: 'Error en el servidor',
                err: error
            })
        }
    }
    static async PassUpdate(req, res) {
        console.log(req.body);
        const id = req.params.id
        const verify = req.usuario
        //console.log(verify);
        const {
            correo_corp,
            password,
        } = req.body
        const perfil = req.body.usuario
        const id_usuario = perfil.id_usuario
        try {
            console.log('Actualizar usuarios');
            if (verify.rol !== 'admin') {
                return res.status(420).json({
                    ok: false,
                    msg: 'Acceso denegado'
                })
            }
            ///verificamos si el usuario existe 
            const usuarioBD = await Usuario.findOne({
                where: {
                    id_usuario,
                    estado: 's'
                }
            })
            if (!usuarioBD) {
                return res.status(404).json({
                    ok: false,
                    msg: 'No existe el registro'
                })
            }
            ///creamos al nuevo usuario con contraseña encriptada
            //encriptamos la contraseña
            const hashedPassword = bcryptjs.hashSync(password, 10);
            const login = await Autentificacion.update({
                correo_corp,
                password : hashedPassword,
                fecha_modificacion : new Date()
            }, {
                where: {
                    id
                }
            })
            res.status(200).json({
                ok: true,
                msg: 'Usuario Actualizado correctamente',
                login
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                msg: error,
            })
        }
    }
    static async getUser(req,res){
        try {
            const usuario = await Autentificacion.findAll({
                where : {
                    estado : 's'
                },
                include : {
                    model : Usuario
                }
            })
            console.log(usuario);
            res.status(200).json({
                ok  :true ,
                 msg : 'Datos enviados correctamente',

                 data : usuario
            })

        } catch (error) {
            console.log(error);
            res.status(500).send({
                msg : 'Error en el sevidor',
                error 
            })
        }
    }
    static async getUserById(req,res){
        try {
            const id  =  req.params.id
            const usuario = await Autentificacion.findOne({
                attributes: ['correo_corp','id'],
                where : {
                    estado : 's',
                    id : id
                },
                include : {
                    model : Usuario
                }
            })
            console.log(usuario);
            res.status(200).json({
                ok  :true ,
                 msg : 'Datos enviados correctamente',

                 data : usuario
            })

        } catch (error) {
            console.log(error);
            res.status(500).send({
                msg : 'Error en el sevidor',
                error 
            })
        }
    }
    static async deleteUser(req,res){
        try {
            const id =  req.params.id
            const usuario = await Autentificacion.findOne({
                where : {
                    estado : 's',
                    id
                },
                include : {
                    model : Usuario
                }
            })
            console.log(usuario);
            usuario.estado = 'n'
            usuario.save()
            res.status(200).json({
                ok  :true ,
                 msg : 'Datos enviados correctamente',

                 data : usuario
            })

        } catch (error) {
            console.log(error);
            res.status(500).send({
                msg : 'Error en el sevidor',
                error 
            })
        }
    }
    static async searchUser(req,res){
        try {
            const ci =  req.params.ci
            ////Buscamos al usuario
            const persona =  await Usuario.findOne({
                where : {
                    ci
                }
            }) 
            if (!persona){
                return res.status(404).send({
                    ok : false , 
                    msg : 'No se encomtro el ci'
                })
            }
            const usuario = await Autentificacion.findAll({
                where : {
                    estado : 's',
                    id_usuario : persona.id_usuario
                },
                include : {
                    model : Usuario
                }
            })
            console.log(usuario);
            res.status(200).json({
                ok  :true ,
                 msg : 'Datos enviados correctamente',

                 data : usuario
            })

        } catch (error) {
            console.log(error);
            res.status(500).send({
                msg : 'Error en el sevidor',
                error 
            })
        }
    }
}
module.exports = controllerLogin