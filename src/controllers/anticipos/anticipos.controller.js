const { request = req, response = res } = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const { Anticipos } = require('../../models/anticipos.model');
const { Usuario } = require('../../models/usuario.model');
class AnticipoController{
    static async postAnticipo(req, res){
        const verify =req.usuario
        console.log('rol',verify);
        console.log(req.body);
        try {
            console.log(req.body);
            const {fecha, anticipos, id_usuario} = req.body
            console.log('Register user');
            console.log(verify);
            if (verify.rol !== 'admin') {
                return res.status(420).json({
                    ok: false,
                    msg: 'Acceso denegado'
                })
            }
            if (fecha === null || anticipos  === null || id_usuario === null){
                return res.status(403)({
                    ok : false,
                    msg : 'Datos infresados fallidos'
                })
            }
            ///Formato de la fecha en DD-MM-YYY,
            const anticipo =  await Anticipos.create({
                id_usuario :id_usuario,
                fecha : fecha,
                estado : 's',
                anticipos  : anticipos,
                fecha_creacion  :  new Date(),
                

            })
            res.status(200).json({
                ok : true ,
                msg : 'Datos procesados correctamente',
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                msg  : 'Error en el servido',
                 error : error
            })
        }
    } 
    static async getAnticipo(req, res){
        try {
            const anticipo = await Anticipos.findAll({
                where  : {

                    estado : 's'
                },
                include: [{
                    model: Usuario
                }]
            })
            if(!anticipo){
                return res.status(404).send({
                    ok : false ,
                    msg : 'Datos no existentes'
                })
            }
            res.status(200).json({
                ok : true ,
                msg : 'Datos procesados correctamente',
                data : anticipo
            })
        } catch (error) {
            res.status(500).send({
                msg  : 'Error en el servidor',
                 error : error
            })
        }
    } 
    static async getByIdAnticipo(req, res){
        try {
            res.status(200).json({
                ok : true ,
                msg : 'Datos procesados correctamente'
            })
        } catch (error) {
            res.status(500).send({
                msg  : 'Error en el servido',
                 error : error
            })
        }
    } 
    static async putAnticipo(req, res){
        try {
            const {fecha,id_usuario,anticipos}=req.body
            const id = req.params.id

            //verificamos la existencia del anticipo
             const anticipo = await Anticipos.findByPk(id)

             if(!anticipo){
                return res.status(404).send({
                    ok:false,
                    msg :' No se encontro el registro'
                })
            }
            //verificamos el estado del registro
            if(anticipo.estado !== 's'){
                return res.status(401).send({
                    ok:false,
                    msg :' registro invalido'
                })
            }
            anticipo.fecha =fecha
            anticipo.id_usuario=id_usuario
            anticipo.anticipos =anticipos
            anticipo.fecha_modificacion = new Date()
            await anticipo.save()
            res.status(200).json({
                ok : true ,
                msg : 'Datos procesados correctamente'
            })
        } catch (error) {
            res.status(500).send({
                msg  : 'Error en el servido',
                 error : error
            })
        }
    } 
    static async deleteAnticipo(req, res){
        try {
            res.status(200).json({
                ok : true ,
                msg : 'Datos procesados correctamente'
            })
        } catch (error) {
            res.status(500).send({
                msg  : 'Error en el servido',
                 error : error
            })
        }
    } 

}
module.exports = AnticipoController