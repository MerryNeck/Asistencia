const { request = req, response = res } = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const { Pagos } = require('../../models/pago.model');
const { Usuario } = require('../../models/usuario.model');
const { sequelize } = require('./../../database/db');
const { Asistencia } = require('../../models/asistencia.model');
const { Boleta } = require('../../models/boleta.model');
const { Op } = require('sequelize');
const { Anticipos } = require('../../models/anticipos.model');
class BoletaController {
    static async postBoleta(req, res) {
        try {
            res.status(200).json({
                ok: true,
                msg: 'Peticion correcta'
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                error: error.message,
                msg: 'Error en el servidor'
            })
        }
    }
    static async getBoleta(req, res) {
        try {
            res.status(200).json({
                ok: true,
                msg: 'Peticion correcta'
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                error: error.message,
                msg: 'Error en el servidor'
            })
        }
    }
    static async getByIdBoleta(req, res) {
        try {
            res.status(200).json({
                ok: true,
                msg: 'Peticion correcta'
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                error: error.message,
                msg: 'Error en el servidor'
            })
        }
    }
    static async putBoleta(req, res) {
        try {
            res.status(200).json({
                ok: true,
                msg: 'Peticion correcta'
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                error: error.message,
                msg: 'Error en el servidor'
            })
        }
    }
    static async deleteBoleta(req, res) {
        try {
            res.status(200).json({
                ok: true,
                msg: 'Peticion correcta'
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                error: error.message,
                msg: 'Error en el servidor'
            })
        }
    }
    static async searchByCiBoleta(req, res) {
        try {
            const {
                ci, fecha
            } = req.body
            //console.log(pago);
            ////VERIFICAMOS QUE EL USUARIO EXISTE EN EL REGISTRO
            const usuario = await Usuario.findOne({
                where: {
                    ci: ci,
                    estado: 's'
                }
            })
            console.log(usuario);
            if (!usuario) {
                return res.status(404).send({
                    ok: false,
                    msg: 'El usuario no existe'
                })
            }
            const [mes, anio] = fecha.split('-');
            console.log(mes, anio);
            if (mes === 'Nan' || anio === undefined) {
                return res.status(425).json({
                    ok: false,
                    msg: 'Fecha invalida'
                })
            }
            const pago = await Pagos.findOne({
                where: {
                    id_usuario: usuario.id_usuario,
                    estado: 's'
                }
            })
            if (!pago) {
                return res.status(404).json({
                    ok: false,
                    msg: 'No se registro el pago'
                })
            }
            /////FUNCIONES PARA CONTAR FALTAS Y RETRASOS
            const sumaRetraso = await sequelize.query(
                `SELECT SUM(CAST(min_retardo AS DECIMAL)) AS suma FROM Asistencia 
                WHERE TO_CHAR(TO_DATE(fecha, 'YYYY-MM-DD'), 'MM-YYYY') = :fecha AND
                 usuario_id = :usuario`,
                {
                    replacements: { fecha: fecha, usuario: usuario.id_usuario },
                    type: Sequelize.QueryTypes.SELECT,
                }
            );

            const sumaUserRetraso = sumaRetraso[0].suma;

            ///suma de dias faltados
            const sumaFaltas = await sequelize.query(
                `SELECT SUM(CAST(faltas AS DECIMAL)) AS suma
                FROM Asistencia
                 WHERE TO_CHAR(TO_DATE(fecha, 'YYYY-MM-DD'), 'MM-YYYY') = :fecha
                    AND usuario_id = :usuario`,
                {
                    replacements: { fecha: fecha, usuario: usuario.id_usuario },
                    type: Sequelize.QueryTypes.SELECT,
                }
            );
            const sumaUserFaltas = sumaFaltas[0].suma
            console.log(sumaUserFaltas);
            ///suma de minutos extras


            const sumaExtra = await sequelize.query(
                `SELECT SUM(CAST(min_extra AS DECIMAL)) AS suma FROM Asistencia 
                WHERE TO_CHAR(TO_DATE(fecha, 'YYYY-MM-DD'), 'MM-YYYY') = :fecha
                AND usuario_id = :usuario`,
                {
                    replacements: { fecha: fecha, usuario: usuario.id_usuario },
                    type: Sequelize.QueryTypes.SELECT,
                }
            )
            const sumaUserExtra = sumaExtra[0].suma

            const fechaInicio = `${anio}-${mes}-01`;
            const fechaFin = `${anio}-${mes}-31`;
            const asistencia = await Asistencia.findOne({
                where: {
                    usuario_id: usuario.id_usuario,
                    fecha: {
                        [Op.between]: [fechaInicio, fechaFin],
                    }
                }

            })
            console.log(asistencia);

            if (!asistencia) {
                return res.status(404).send({
                    ok: false,
                    msg: 'No existe la fecha'
                })
            }
            const fechaPago = new Date(); // Obtener la fecha actual

            // Obtener la fecha en formato 'YYYY-MM-DD'
            const fechaPagoString = fechaPago.toISOString().split('T')[0]; // Obtener la parte 'YYYY-MM-DD'

            const boleta = await Boleta.create({
                id_pago: pago.id_sueldo,
                id_asistencia: asistencia.id_asistencia,
                periodo_pago: fecha,
                fecha_pago: fechaPagoString,
                fecha_creacion: new Date(),
                estado: 's'
            })
            const anticipo = 0
            const mnrbs = (pago.sueldo / 480) * parseFloat(asistencia.hrs_no_recuperadas)
            const descuentoString = ` ${pago.sueldo}-${pago.retencion}-${sumaUserRetraso}-${sumaUserFaltas}`
            const afps = pago.sueldo * 0.15
            if(!mnrbs){

            mnrbs = 0
            afps = 0
            const sueldo_bruto = Math.round(pago.sueldo - mnrbs - afps - anticipo)  
            const descuento = mnrbs+afps+anticipo
            }
            console.log('sueldo',sueldo_bruto);
            console.log(asistencia.hrs_no_recuperadas);
            const nombre = usuario.nombre+' '+ usuario.apellido_paterno
            console.log(nombre);
            res.status(200).json({
                ok: true,
                msg: 'Peticion correcta',
                data: {
                    boleta: boleta,
                    pago: pago,
                    afps: afps,
                    atrasos: sumaUserRetraso,
                    faltas : sumaUserFaltas,
                    mnr: asistencia.hrs_no_recuperadas,
                    mnrbs:mnrbs,
                    anticipo: anticipo.anticipo,
                    descuentos:descuento,
                    sueldo_bruto: sueldo_bruto,
                    persona : {
                        nombre ,
                        dias_laborales : pago.dias_trabajado,
                        mes,
                        fecha : fechaPagoString
                    }
                }
                
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                error: error.message,
                msg: 'Error en el servidor'
            })
        }
    }
}
module.exports = BoletaController