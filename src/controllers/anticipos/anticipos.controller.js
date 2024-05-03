const { request = req, response = res } = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const { Anticipos } = require('../../models/anticipos.model');
const { Usuario } = require('../../models/usuario.model');
class AnticipoController{
    static async postAnticipo(req, res){
        const verify =req.usuario
        console.log('rol',verify);
        const {fecha, anticipos, id_usuario, detalle} = req.body
            console.log("frond",req.body);
        console.log(req.body);
        try {
            console.log(req.body);
            

            if (verify.rol !== 'admin') {
                return res.status(420).json({
                    ok: false,
                    msg: 'Acceso denegado'
                })
            }
            if (fecha === null || anticipos  === null || id_usuario === null || detalle === null){
                return res.status(403)({
                    ok : false,
                    msg : 'Datos ingresados fallidos'
                })
            }
            ///Formato de la fecha en DD-MM-YYY,
            const anticipo =  await Anticipos.create({
                id_usuario :id_usuario,
                fecha : fecha,
                estado : 's',
                anticipos  : anticipos,
                detalle : detalle,
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
            //console.log(anticipo);
            res.status(200).json({
                ok : true ,
                msg : 'Datos procesados correctamente',
                data : anticipo
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                msg  : 'Error en el servidor',
                 error : error.message,
            })
        }
    } 
    static async getBuscarAnticipo(req, res){
        try {

            const ci =  req.params.ci
           // console.log(req.params);
            const usuario = await Usuario.findOne({
                where: {
                    ci
                }
            })
            console.log(usuario);
            if (!usuario){
                return res.status(404).send({
                    ok : false ,
                     msg : 'No se encontro el anticipo'
                })
            }
            const anticipo = await Anticipos.findAll({
                where: {
                    estado: 's',
                    id_usuario: usuario.id_usuario
                },
                include: {
                    model: Usuario
                }
            })

            res.status(200).json({
                ok : true ,
                msg : 'Datos procesados correctamente',
                data: anticipo
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

            const id_anticipo =  req.params.id
           // console.log(req.params);
           // console.log(req.params);
            const anticipo = await Anticipos.findOne({
                where: {
                    id_anticipo:id_anticipo
                },
                include: {
                    model: Usuario
                }
            })
            console.log(anticipo);
            if (!anticipo){
                return res.status(404).send({
                    ok : false ,
                     msg : 'No se encontro el anticipo'
                })
            }
           

            res.status(200).json({
                ok : true ,
                msg : 'Datos procesados correctamente',
                data: anticipo
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
            const id =  req.params.id
            const anticipo =  await Anticipos.findByPk(id)
            if (!anticipo){
                return res.status(404).send({
                    ok : false ,
                    msg : 'No existe el antcipo'
                })
            }
            anticipo.estado = 'n'
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
    static async searchAnticipo  (req,res){
        try {
            console.log(req.body);
            const {ci, fecha}  = req.body
            ////BUSCAMOS POR EL CI 
            const usuario  = await Usuario.findOne({
                where : {
                    ci 
                }
            })
            if(!usuario){
                return res.status(404).send({
                    ok  : false ,
                     msg : 'El usuario no existe'
                })
            }
            ////buscamos el registro de la boleta 
            const anticipo = await Anticipos.findOne({
                where : {
                    estado : 's',
                    fecha ,
                    id_usuario : usuario.id_usuario
                },
                include: {
                    model: Usuario
                }
            })
            if (!anticipo){
                return res.status(404).send({
                    ok  : false ,
                     msg : 'No se encontro el anticipo'
                })
            }

            res.status(200).json({
                ok  : true,
                msg : 'Todo bien',
                data: anticipo
                
            })

            
        } catch (error) {
            console.log(error);
            res.status(500).send({
                msg : 'Error en el servidor',
                error
            })
        }
    }

}
module.exports = AnticipoController