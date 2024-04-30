const { request = req, response = res } = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const { Anticipos } = require('../../models/anticipos.model');
const { Usuario } = require('../../models/usuario.model');
class AnticipoController{
    static async postAnticipo(req, res){
        try {
            console.log(req.body);
            const {fecha, anticipos, ci} = req.body

            if (fecha === null || anticipos  === null){
                return res.status(403)({
                    ok : false,
                    msg : 'Datos infresados fallidos'
                })
            }////traemos al usuario de la base de datos en funcion al ci que se envia 
            const usuario =  await Usuario.findOne({
                where: {
                    ci,
                    estado  : 's'
                }
            })
            console.log(usuario);
            if (!usuario){
                return res.status(404).send ({
                    ok : false ,
                    msg : 'No se encotro en la base datos'
                })
            }
            const usuario_id =  usuario.id_usuario
            //const id_user = req.usuario.usuario.dataValues.id;
            ///Formato de la fecha en DD-MM-YYY,
            const anticipo =  await Anticipos.create({
                id_usuario : usuario_id,
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
            const anticipos = await Anticipos.findAll({
                where  : {

                    estado : 's'
                },
                include: [{
                    model: Usuario
                }]
            })
            if(!anticipos){
                return res.status(404).send({
                    ok : false ,
                    msg : 'Datos no existentes'
                })
            }
            res.status(200).json({
                ok : true ,
                msg : 'Datos procesados correctamente',
                data : anticipos
            })
        } catch (error) {
            res.status(500).send({
                msg  : 'Error en el servido',
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