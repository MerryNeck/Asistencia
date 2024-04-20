const { request = req, response = res } = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const { Asistencia } = require('../../models/asistencia.model');
const { Usuario } = require('../../models/usuario.model');

class ControllerAsistencia {
    static async getAsistencia(req, res) {
        console.log('listando asistencias');
        try {
            const asistencia = await Asistencia.findAll({
                include: {
                    model: Usuario
                }
            });
            if (asistencia.length == 0) {
                return res.status(404).json({
                    msg: 'No existe registros',
                    ok: false
                })
            }
            console.log(asistencia);
            res.status(200).json({
                ok: true,
                msg: 'Datos encontrados',
                data: asistencia
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                msg: 'error en el servidor',
                error: error.message
            })
        }
    }
    static async getByCiOrDate(req, res) {
        try {
            const { ci, fecha } = req.body
            let asistencia
            if (fecha && ci) {
                asistencia = await Asistencia.findAll({
                    where: {
                        fecha,
                    },
                    include:
                        [{
                            model: Usuario,
                            where: {
                                ci
                            }
                        }]

                })
                console.log('fecha y ci');

            } else if (fecha == '') {
                console.log('sin fecha');
                asistencia = await Asistencia.findAll({
                    include:
                        [{
                            model: Usuario,
                            where: {
                                ci
                            }
                        }]

                })
            } else if (ci == '') {
                console.log('sin ci');
                asistencia = await Asistencia.findAll({
                    where: {
                        fecha,
                    },
                    include:
                        [{
                            model: Usuario,
                        }]

                })
            } else {
                console.log('sin datos');
                return res.status(400).send({
                    ok: false,
                    msg: 'sin registros'
                })
            }
            if (asistencia.length === 0) {
                return res.status(404).send({
                    ok: false,
                    msg: 'No existe registreos'
                })
            }
            res.status(200).json({
                ok: true,
                msg: 'Datos enviados',
                data: asistencia
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                msg: 'Error en el servidor',
                error: error.message
            })
        }
    }
    static async getById(req,res){
        const id = req.params.id
        try {
            console.log(id);
            const asistencia =  await Asistencia.findByPk(id)
            if(!asistencia){
                return res.status(404).send({
                    ok:false,
                    msg : 'Sin registros'
                })
            }
            res.status(200).json({
                ok: true ,
                msg :'Registro enviado',
                data : asistencia
            })

        } catch (error) {
            console.log(error.message);
            res.status(500).send({
                msg :'Error en el servidor',
                error: error.message
            })
        }
    }
    static async putAsitencia(req,res){
        console.log('editar asistencia');
        console.log(req.body);
        try {
            
            const {fecha,tprano_ingreso,tde_ingreso,tprano_salida,tde_salida,faltas, min_extra}  = req.body
            const id  = req.params.id

            ////verificamos la existencia del registro

            const asistencia =  await Asistencia.findByPk(id)
            
            if(!asistencia){
                return res.status(404).send({
                    ok:false,
                    msg :' No se encontro el registro'
                })
            }
            //verificamos el estado del registro
            if(asistencia.estado !== 's'){
                return res.status(401).send({
                    ok:false,
                    msg :' regsitro invalido'
                })
            }

            ////modificamos el registro 
            asistencia.fecha = fecha
            asistencia.faltas = faltas
            asistencia.tprano_ingreso = tprano_ingreso
            asistencia.tde_salida =tde_salida,
            asistencia.fecha_modificacion = new Date(),
            asistencia.tde_ingreso = tde_ingreso,
            asistencia.tde_salida = tde_salida ,
            asistencia.min_extra = min_extra
            await asistencia.save()
            //console.log(asistencia);
            res.status(200).json({
                ok : true,
                msg: 'Asistencia actualizada',
                data: asistencia
            })

        } catch (error) {
            console.log(error);
            res.status(500).send({
                msg: 'Error rn el servidor',
                error: error.message
            })
        }
    }
}
module.exports = ControllerAsistencia