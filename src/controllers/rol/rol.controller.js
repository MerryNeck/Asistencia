const { request = req, response = res } = require('express');
const { Rol } = require('../../models/rol.model');



class rolController{
    static async postRol(req,res){
        try {
            console.log(req.body);

            const {tipo} = req.body

            const rol =  await Rol.create({
                tipo:tipo,
                fecha_creacion : new Date(),
                estado  : 's'
            })
            res.status(200).json({
                ok : true,
                msg: 'Rol creado',
                data: rol
            })
            
        } catch (error) {
            //console.log(error);
            res.status(500).json({
                msg : 'Error en el servidor',
                error: error.message
            })
        }
    }
    static async getRol(req,res){
        try {
            console.log('listando roles');
            const rol =  await Rol.findAll({
                where : {
                    estado : 's'
                }
            })
            if(rol.length ===0){
                return res.status(404).send({
                    msg: 'No se encontro recursos',
                    ok : false
                })
            }
            res.status(200).json({
                ok :true,
                msg : 'Datos encotrados',
                data : rol
            })
        } catch (error) {
            res.status(500).json({
                msg : 'Error en el servidor',
                error: error.message
            })
        }
    }
    static async getByIdRol(req,res){
        try {
            const id =  req.params.id
            console.log('listando roles');
            const rol =  await Rol.findByPk(id)
            if(rol.length ===0){
                return res.status(404).send({
                    msg: 'No se encontro recursos',
                    ok : false
                })
            }
            if(rol.estado === 'n'){
                return res.status(410).send({
                    msg: 'Rol desactivado',
                    ok : false
                })
            }
            res.status(200).json({
                ok :true,
                msg : 'Datos encotrados',
                data : rol
            })
        } catch (error) {
            res.status(500).json({
                msg : 'Error en el servidor',
                error: error.message
            })
        }
    }
    static async putRol(req,res){
        try {
            const id =  req.params.id

            const {tipo} =  req.body
            const rol =  await Rol.findByPk(id)
            if(!rol){
                return res.status(404).send({
                    msg: 'No se encontro recursos',
                    ok : false
                })
            }
            if(rol.estado === 'n'){
                return res.status(410).send({
                    msg: 'Rol desactivado',
                    ok : false
                })
            }
            rol.tipo = tipo
            rol.fecha_modificacion = new Date() 
            await rol.save()
            res.status(200).json({
                ok :true,
                msg : 'Datos encotrados',
                data : rol
            })
        } catch (error) {
            res.status(500).json({
                msg : 'Error en el servidor',
                error: error.message
            })
        }
    }
    static async deleteRol(req,res){
        try {
            const id =  req.params.id

            const rol =  await Rol.findByPk(id)
            if(rol.length ===0){
                return res.status(404).send({
                    msg: 'No se encontro recursos',
                    ok : false
                })
            }
            if(rol.estado === 'n'){
                return res.status(410).send({
                    msg: 'Rol desactivado',
                    ok : false
                })
            }
            rol.estado = 'n'
            await rol.save()
            res.status(200).json({
                ok :true,
                msg : 'Datos encotrados',
                data : rol
            })
        } catch (error) {
            res.status(500).json({
                msg : 'Error en el servidor',
                error: error.message
            })
        }
    }
}

module.exports = rolController