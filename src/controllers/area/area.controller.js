const { request = req, response = res } = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const { Area } = require('../../models/area.model');

class AreaController{
    static async postAreas(req,res){
        try {
            console.log(req.body);
            const { tipo_area}  = req.body

            
            console.log('Registrar Areas');
            const areas =  await Area.create({
                tipo_area : tipo_area,
                estado : 's',
                fecha_creacion : new Date()
            })
            res.status(200).json({
                ok : true,
                msg : 'Proceso realizado',
                data : areas
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                msg: 'Error en el servidor',
                error  :error.message
            })
        }
    }
    static async getAreas(req,res){
        try {
            console.log('Buscar Areas');

            const areas = await Area.findAll({
                where : {
                    estado  : 's'
                }
            })
            if(!areas){
                return res.status(404).send({
                    ok:false ,
                    msg : 'No se encotro datos'
                })
            }
            console.log(areas);
            res.status(200).json({
                ok : true,
                msg : 'Proceso realizado',
                data : areas
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                msg: 'Error en el servidor',
                error  :error.message
            })
        }
    }
    static async getByIdAreas(req,res){
        try {
            console.log('Buscar por id Areas');
            const id = req.params.id;
            ///Buscamos si exite el area
            const area  =await Area.findByPk(id); 
            if(!area){
                return res.status(404).send({
                    msg: 'No exite el registro',
                    ok : false
                })
            }
            if(area.estado === 'n'){
                return res.status(402).send({
                    ok : false,
                    msg: 'Area deshabilitada'
                })
            }
            res.status(200).json({
                ok : true,
                msg : 'Proceso realizado',
                data: area
            })
        } catch (error) {
            res.status(500).send({
                msg: 'Error en el servidor',
                error  :error.message
            })
        }
    }
    static async putAreas(req,res){
        try {
            console.log('Actualizar Areas');
            const id =  req.params.id
            const {tipo_area} = req.body
            ///verificamos si existe el area
            const area =  await Area.findByPk(id)
            if (!area){
                return res.status(404).send({
                    ok : false,
                    msg : 'No se encontro el area'
                })
            }
            if(area.estado ==='n'){
                return res.status(402).send({
                    ok : false ,
                    msg : 'Area deshabilidatda'
                })
            }
            area.tipo_area = tipo_area
            area.fecha_modificacion = new Date()
            await area.save()
            res.status(200).json({
                ok : true,
                msg : 'Proceso realizado'
            })
        } catch (error) {
            res.status(500).send({
                msg: 'Error en el servidor',
                error  :error.message,
                data: area
            })
        }
    }
    static async deleteAreas(req,res){
        try {
            console.log('Eliminar Areas');
            const id =  req.params.id
            ///verificamos si existe el area
            const area =  await Area.findByPk(id)
            if (!area){
                return res.status(404).send({
                    ok : false,
                    msg : 'No se encontro el area'
                })
            }
            if(area.estado ==='n'){
                return res.status(402).send({
                    ok : false ,
                    msg : 'Area deshabilidatda'
                })
            }
            area.estado = 'n'
            area.fecha_actualizacion = new Date()
            await area.save()
            res.status(200).json({
                ok : true,
                msg : 'Proceso realizado'
            })
        } catch (error) {
            res.status(500).send({
                msg: 'Error en el servidor',
                error  :error.message
            })
        }
    }
}
module.exports = AreaController