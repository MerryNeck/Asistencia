const { request = req, response = res } = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const { Usuario } = require('../../models/usuario.model');
const { Pagos } = require('../../models/pago.model');

class PagosController{
    static async PostPagos(req, res){
        const { dias_trabajado,sueldo,id_usuario} = req.body
        try {
            console.log("frond",req.body);
            
            if (dias_trabajado === null || sueldo  === null || id_usuario === null ){
                return res.status(403)({
                    ok : false,
                    msg : 'Datos ingresados fallidos'
                })
            }
            //console.log("frond",req.body);
            ////verificamos si el ci existe
           console.log(id_usuario); 
            const retencion = sueldo*0.15
            const sueldo_bruto = sueldo-retencion
            //const id_usuario  = usuario.id_usuario
            console.log(id_usuario);
            const pago = await Pagos.create({
                sueldo: sueldo,
                dias_trabajado : dias_trabajado,
                retencion :retencion,
                sueldo_bruto : sueldo_bruto,
                id_usuario :id_usuario,
                estado  :'s',
                fecha_creacion : new Date()
            })
            console.log('pago',pago);
            res.status(200).json({
                ok : true,
                msg: 'Proceso realizado',
                data : pago
                
            })
        } catch (error) {
            res.status({
                msg : 'Error en le servidor',
                error: error.message

            })
        }
    }
    static async getPagos(req, res){
        try {
            const pagos  = await Pagos.findAll({
                where : {
                    estado : 's'
                },
                include: [{
                    model: Usuario
                }]
            });
            if (!pagos){
                return res.status(404).send({
                    ok :false,
                    msg : 'No exite registros'
                })
            }
            res.status(200).json({
                ok : true,
                msg: 'Proceso realizado',
                data: pagos
                
            })
        } catch (error) {
            res.status({
                msg : 'Error en le servidor',
                error: error.message
            })
        }
    }
    static async getByIdPagos(req, res){
        try {
            const id = req.params.id
            const pagos  = await Pagos.findOne({
                where : {
                    estado : 's',
                    id_sueldo : id
                },
                include: [{
                    model: Usuario
                }]
            })
            if (!pagos){
                return res.status(404).send({
                    ok :false,
                    msg : 'No exite registros'
                })
            }
            res.status(200).json({
                ok : true,
                msg: 'Proceso realizado',
                data: pagos
                
            })
            res.status(200).json({
                ok : true,
                msg: 'Proceso realizado'
                
            })
        } catch (error) {
            res.status({
                msg : 'Error en le servidor',
                error: error.message
            })
        }
    }
    static async PutPagos(req, res){
        try {
            const id = req.params.id
            console.log(req.body);
            const {
                id_sueldo,sueldo,dias_trabajado,retencion,sueldo_bruto,ci,estado 
            }= req.body
            const pagos  = await Pagos.findOne({
                where : {
                    estado : 's',
                    id_sueldo : id
                }
            })
            if (!pagos){
                return res.status(404).send({
                    ok :false,
                    msg : 'No exite registros'
                })
            }
            pagos.id_usuario = ci,
            pagos.sueldo = sueldo
            pagos.dias_trabajado = dias_trabajado
            pagos.retencion =retencion
            pagos.fecha_modificacion = new Date(),
            await pagos.save()
            res.status(200).json({
                ok : true,
                msg: 'Proceso realizado',
                data: pagos
                
            })
            
        } catch (error) {
            res.status({
                msg : 'Error en le servidor',
                error: error.message
            })
        }
    }
    static async deletePagos(req, res){
        try {
            const id = req.params.id
            const pagos  = await Pagos.findOne({
                where : {
                    estado : 's',
                    id_sueldo : id
                }
            })
            if (!pagos){
                return res.status(404).send({
                    ok :false,
                    msg : 'No exite registros'
                })
            }
            pagos.estado = 'n',
            pagos.fecha_modificacion = new Date(),
            await pagos.save()
            res.status(200).json({
                ok : true,
                msg: 'Proceso realizado',
                data: pagos
                
            })
            res.status(200).json({
                ok : true,
                msg: 'Proceso realizado'
                
            })
        } catch (error) {
            res.status({
                msg : 'Error en le servidor',
                error: error.message
            })
        }
    }
    static async searchPagos(req, res){



        try {
            const {ci} = req.params
            ////buscamos al usuario por el ci en la base de datos
            const usuario =  await Usuario.findOne({
                where : {
                    ci  : ci
                }
            })

            if(!usuario){
                 return res.status(404).send({
                    ok : false,
                    msg : 'No se encontro con el usuario'
                 })
            }

            const pago  =  await Pagos.findAll({
                where  :{
                    estado : 's',
                    id_usuario : usuario.id_usuario
                },
                include: [{
                    model: Usuario
                }]
                
            })
            if(!pago){
                return res.status(404).send({
                   ok : false,
                   msg : 'No se encontro con el Pago'
                })
           }

            res.status(200).json({
                ok : true,
                msg: 'Proceso realizado',
                data: pago
                
            })
        } catch (error) {
            res.status({
                msg : 'Error en le servidor',
                error: error.message
            })
        }
    }
}
module.exports = PagosController