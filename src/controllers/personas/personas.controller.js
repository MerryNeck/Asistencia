// importamos response y request de express
const { request = req, response = res } = require('express');
const { Usuario } = require('../../models/usuario.model');
const { Area } = require('../../models/area.model');
const { Rol } = require('../../models/rol.model');


class ControllerPersonas {
    
    static async postPersonas(req, res) {
        const verify = req.usuario
        console.log('rol',verify);
        console.log(req.body);
        const {
            nombre, apellido_paterno, apellido_materno, ci, id_rol, id_area,id_usuario
        } = req.body
        console.log("frond",req.body);
        try {
            console.log('Register user');
            console.log(verify);
            if (verify.rol !== 'admin') {
                return res.status(420).json({
                    ok: false,
                    msg: 'Acceso denegado'
                })
            }
            const usuario = await Usuario.create({
                nombre:nombre,
                apellido_paterno:apellido_paterno,
                apellido_materno:apellido_materno,
                ci:ci,
                estado: 's',
                fecha_creacion: new Date(),
                id_rol:id_rol,
                id_area:id_area,
                id_usuario:id_usuario,
            })
            console.log(usuario);
            if (!usuario) {
                return res.status(402).json({
                    ok: false,
                    msg: 'no se pudo crear al usuario'
                })
            }
            res.status(200).json({
                ok: true,
                msg: 'Usuario creado correctamente',
                usuario
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                msg: error,
            })
        }
    }
    static async getPersonas(req, res) {
        try {
            console.log('get usuarios');
            const usuarios = await Usuario.findAll({
                where: {
                    estado: 's'
                },
                include :[
                    {model : Area},
                    {model : Rol}
                ]

            })
            if (!usuarios) {
                return res.status(404).json({
                    ok: false,
                    msg: 'no existe registros'
                })
            }
            //console.log(usuarios);
            res.status(200).json({
                ok: true,
                data: usuarios,
                msg : 'todo ok'
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                msg: error.message,
            })
        }
    }
    static async getByIdPersonas(req, res) {
        const id_usuario = req.params.id
        try {
            console.log('get by id');
            const usuario = await Usuario.findAll({
                where: {
                    estado: 's',
                    id_usuario
                }
            })
            if (usuario.length == 0) {
                return res.status(404).json({
                    ok: false,
                    msg: 'No existen registros'
                })

            }
            res.status(200).json({
                ok: true,
                usuario
            })
        } catch (error) {
            res.status(500).send({
                msg: error,
            })
        }
    }
    static async DeletePersonas(req, res) {
        const verify = req.usuario
        const id_usuario = req.params.id
        try {
            console.log('delete usuarios');
            console.log(verify);
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
            const usuario = await Usuario.update({
                estado: 'n',
                fecha_modificacion: new Date()
            }, {
                where: {
                    id_usuario
                }
            })
            res.status(200).json({
                ok: true,
                msg: 'Usuario eliminado correctamente',
                usuario
            })
        } catch (error) {
            res.status(500).send({
                msg: error,
            })
        }
    }
    static async BuscarPersonas(req, res) {
        try {
            const { ci } = req.body;
    
            if (!ci) {
                return res.status(400).json({ msg: "Por favor, proporcione un número de cédula de identidad." });
            }
    
            const personasEncontradas = await Usuario.findAll({
                where: {
                    ci: ci
                }
            });
    
            if (!personasEncontradas || personasEncontradas.length === 0) {
                return res.status(404).json({ msg: "No se encontraron personas con el número de cédula de identidad proporcionado." });
            }
    
            return res.status(200).json({ personas: personasEncontradas });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Error interno del servidor." });
        }
    }
    static async UpdatePersonas(req, res) {
        console.log(req.body);
        const id = req.params.id
        const verify = req.usuario
        console.log(verify);
        const {
            nombre,
            apellido_paterno,
            apellido_materno,
            ci,
            id_rol,
            id_area,
            id_usuario
        } = req.body
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
            const usuario = await Usuario.update({
                nombre,
                apellido_paterno,
                apellido_materno,
                ci,
                id_rol,
                id_area,
                fecha_modificacion : new Date()
            }, {
                where: {
                    id_usuario
                }
            })
            res.status(200).json({
                ok: true,
                msg: 'Usuario Actualizado correctamente',
                usuario
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                msg: error,
            })
        }
    }
}
module.exports = ControllerPersonas