const { request = req, response = res } = require('express');
const { Sequelize, DataTypes } = require('sequelize');
///IMPORTAMOS EL MODELO

const { RutasExcel } = require('../../models/rutas_excel.model')
const { Asistencia } = require('../../models/asistencia.model');
///importaciones de la librerias necesarias
const fs = require('fs');
const xls = require('xlsjs');

const { sequelize } = require('./../../database/db');
class ControllerExcel {
    static async postExcel(req, res) {
        console.log('insertando datos');
        try {
            console.log(req.files);
            if (!req.files) {
                return res.status(403).json({
                    msg: 'No se encontro el archivo',
                    ok: false
                })
            }
            const excel = req.files.archivo
            //console.log(excel.path);
            const workbook = xls.readFile(`${excel.path}`);
            const sheetName = workbook.SheetNames[3];
            //console.log(sheetName);
            //console.log(workbook);
            const sheet = workbook.Sheets[sheetName];
            const data = xls.utils.sheet_to_json(sheet);
            //console.log(data);
            //Insertamos el excel a la base de datos

            ////valores para la Base de datos
            const rutas_excel = excel.path
            const fecha_creacion = new Date()
            const estado = 's'
            const id_usuario = req.usuario.usuario.dataValues.id
            const uploadExcel = await RutasExcel.create({
                rutas_excel,
                fecha_creacion,
                estado
            })

            //insertamos valores a la base de datos
            let cont = 0
            //console.log(data);
            for (const registro of data) {
                cont++
                const id = registro['Reporte de Excepciones'];
                const nombre = registro.__EMPTY;
                const fecha = registro.__EMPTY_2;
                const horaInicio = registro.__EMPTY_3;
                const horaFin = '12:00';
                const horaInicio2 = registro.__EMPTY_5;
                const horaFin2 = registro.__EMPTY_6;
                const retardos = registro.__EMPTY_7;
                const salidaTemprano = registro.__EMPTY_8;
                const total = registro.__EMPTY_10;
                //console.log('nombre es : ', fecha);
                if (fecha !== undefined && fecha !== '') {
                    if (!isNaN(id)) {
                        const asistencia = await Asistencia.create({
                            fecha,
                            tprano_ingreso: horaInicio,
                            tde_ingreso: horaInicio2,
                            min_retardo: retardos,
                            min_adelantados: salidaTemprano,
                            total_horas: '480',
                            tprano_salida: horaFin,
                            tde_salida: horaFin2,
                            fecha_creacion: new Date(),
                            estado: 's',
                            id_excel: uploadExcel.id_excel,
                            id_usuario: id_usuario,
                            usuario_id: id,
                        })
                    }

                } else {
                    //console.log('sin datos');
                }


            }
            await Asistencia.update({ faltas: null }, { where: {} });
            ////Calculado los sueldos 
            const asistencia = await Asistencia.findAll()
            const id_user = await Asistencia.findAll({
                attributes: ['usuario_id'],
                group: ['usuario_id'],
                where: {
                    id_excel: uploadExcel.id_excel
                }
            })
            //console.log(id_user);

            for (const user_id of id_user) {
                //console.log(user_id);
                const userById = await Asistencia.findAll({ where: { usuario_id: user_id.usuario_id } })

                for (const persona of userById) {
                    //console.log(persona);
                    
                    ///HORARIOS POR DEFECTO
                    let hora_real_entrada = '09:00'
                    let hora_medio_tiempo = '12:00'
                    let hora_real_entrada_medio_dia = '13:00'
                    let hora_real_salida = '18:00'

                    ////HORARIOS DE LA BASE DE DATOS
                    let hora_entrada = persona.tprano_ingreso
                    let hora_entrada_medio_dia = persona.tde_ingreso
                    let hora_salida = persona.tde_salida
                    let tiempo_requerido = 480


                    //validaciones para datos vacios

                    /////LLENADO DE DATOS EN FUNCION A LAS EXCEPCIONES

                    ////faltas
                    if(hora_entrada === null && hora_entrada_medio_dia === null &&hora_salida === null ){
                        persona.tprano_salida  = null
                        persona.faltas = 1
                    }else if (hora_entrada === null && hora_entrada_medio_dia === null &&hora_salida !== null){

                        ///caso llegada al medio dia 
                        persona.tde_ingreso = hora_real_entrada_medio_dia
                        persona.faltas = 0.5

                        const minutos_despues_del_receso = calcularTiempoTranscurrido(persona.tde_ingreso, hora_salida)
                        //console.log(minutos_despues_del_receso);
                        const tiempo_real_trabajado = minutos_despues_del_receso
                        
                        const min_extra = tiempo_real_trabajado - 360


                        const update = await Asistencia.findOne({ where: { id_asistencia: persona.id_asistencia } })
                        update.min_extra = min_extra,

                        await update.save()
                    }else if (hora_entrada === null && hora_entrada_medio_dia !== null &&hora_salida !== null){
                        ////caso llegada medio dia
                        persona.tprano_salida = null
                        persona.faltas = 0.5
                        const minutos_despues_del_receso = calcularTiempoTranscurrido(hora_entrada_medio_dia, hora_salida)
                        //console.log(minutos_despues_del_receso);
                        const tiempo_real_trabajado = minutos_despues_del_receso

                        const min_extra = tiempo_real_trabajado - 360


                        const update = await Asistencia.findOne({ where: { id_asistencia: persona.id_asistencia } })
                        update.min_extra = min_extra,

                        await update.save()
                    }else if (hora_entrada !== null && hora_entrada_medio_dia !== null &&hora_salida !== null){


                        ///caso trabajo completo
                        const minutos_antes_del_receso = calcularTiempoTranscurrido(hora_entrada, hora_medio_tiempo)
                        //console.log(minutos_antes_del_receso);
                        const minutos_despues_del_receso = calcularTiempoTranscurrido(hora_entrada_medio_dia, hora_salida)
                        //console.log(minutos_despues_del_receso);
                        const tiempo_real_trabajado = minutos_antes_del_receso + minutos_despues_del_receso

                        const min_extra = tiempo_real_trabajado - tiempo_requerido


                        const update = await Asistencia.findOne({ where: { id_asistencia: persona.id_asistencia } })
                        update.min_extra = min_extra,

                        await update.save()
                        console.log("registro asctual" ,update.save);
                    }else if (hora_entrada !== null && hora_entrada_medio_dia === null &&hora_salida !== null){
                        ////trabajo completo si registro del medio dia
                        persona.tde_ingreso = hora_real_entrada_medio_dia
                        const minutos_antes_del_receso = calcularTiempoTranscurrido(hora_entrada, hora_medio_tiempo)
                        //console.log(minutos_antes_del_receso);
                        const minutos_despues_del_receso = calcularTiempoTranscurrido(persona.tde_ingreso, hora_salida)
                        //console.log(minutos_despues_del_receso);
                        const tiempo_real_trabajado = minutos_antes_del_receso + minutos_despues_del_receso

                        const min_extra = tiempo_real_trabajado - tiempo_requerido


                        const update = await Asistencia.findOne({ where: { id_asistencia: persona.id_asistencia } })
                        update.min_extra = min_extra,

                        await update.save()
                    }else if (hora_entrada !== null && hora_entrada_medio_dia === null &&hora_salida === null){
                        ///caso trabajo hasta el medio dia


                        persona.tde_salida = hora_medio_tiempo
                        persona.faltas = 0.5
                        const minutos_antes_del_receso = calcularTiempoTranscurrido(hora_entrada, hora_medio_tiempo)
                        //console.log(minutos_antes_del_receso);
                        //console.log(minutos_despues_del_receso);
                        const tiempo_real_trabajado = minutos_antes_del_receso

                        const min_extra = tiempo_real_trabajado - 180


                        const update = await Asistencia.findOne({ where: { id_asistencia: persona.id_asistencia } })
                        update.min_extra = min_extra,

                        await update.save()


                    }else if (hora_entrada !== null && hora_entrada_medio_dia !== null &&hora_salida === null){
                        ////trabajo completo si registro de salida
                        persona.tde_salida = hora_real_salida
                        const minutos_antes_del_receso = calcularTiempoTranscurrido(hora_entrada, hora_medio_tiempo)
                        //console.log(minutos_antes_del_receso);
                        const minutos_despues_del_receso = calcularTiempoTranscurrido(hora_entrada_medio_dia, persona.tde_salida)
                        //console.log(minutos_despues_del_receso);
                        const tiempo_real_trabajado = minutos_antes_del_receso + minutos_despues_del_receso

                        const min_extra = tiempo_real_trabajado - tiempo_requerido


                        const update = await Asistencia.findOne({ where: { id_asistencia: persona.id_asistencia } })
                        update.min_extra = min_extra,

                        await update.save()
                    }

                    ///Actualizamos a la base de datos
                    await persona.save()

                    ///TRABAJAMOS CON LOS NUEVOS DATOS
                    hora_entrada = persona.tprano_ingreso
                    hora_entrada_medio_dia = persona.tde_ingreso
                    hora_salida = persona.tde_salida
                    tiempo_requerido = 480
                }

            }
            /////funciones para el calculo de los pagos 

            ////DESCUENTOS
            ////LOS DESCUENTOS SE CALCULAN EN FUNCION A LOS RETRASOS 
            ////CALCULADO LOS RETRADOS POR EL ID 
            for (const userRetraso of id_user) {
                ///suma de nimutos retrasados
                const sumaRetraso = await sequelize.query(
                    `SELECT SUM(CAST(min_retardo AS DECIMAL)) AS suma FROM Asistencia WHERE usuario_id = :usuario`,
                    {
                        replacements: { usuario: userRetraso.usuario_id },
                        type: Sequelize.QueryTypes.SELECT,
                    }
                );

                const sumaUserRetraso = sumaRetraso[0].suma;
                ///suma de dias faltados
                const sumaFaltas = await sequelize.query(
                    `SELECT SUM(CAST(faltas AS DECIMAL)) AS suma FROM Asistencia WHERE usuario_id = :usuario`,
                    {
                        replacements: { usuario: userRetraso.usuario_id },
                        type: Sequelize.QueryTypes.SELECT,
                    }
                )
                const sumaUserFaltas = sumaFaltas[0].suma
                ///suma de minutos extras


                const sumaExtra = await sequelize.query(
                    `SELECT SUM(CAST(min_extra AS DECIMAL)) AS suma FROM Asistencia WHERE usuario_id = :usuario`,
                    {
                        replacements: { usuario: userRetraso.usuario_id },
                        type: Sequelize.QueryTypes.SELECT,
                    }
                )
                const sumaUserExtra = sumaExtra[0].suma
                let SancionUserRetraso = 0
                if (sumaUserRetraso >= 45) {
                    if (sumaUserRetraso >= 46 && sumaUserRetraso <= 60) {
                        SancionUserRetraso = 120
                    } else if (sumaUserRetraso >= 61 && sumaUserRetraso <= 90) {
                        SancionUserRetraso = 240
                    } else if (sumaUserRetraso >= 91 && sumaUserRetraso <= 120) {
                        SancionUserRetraso = 480
                    } else if (sumaUserRetraso >= 121 && sumaUserRetraso <= 150) {
                        SancionUserRetraso = 960
                    } else if (sumaUserRetraso >= 151 && sumaUserRetraso <= 180) {
                        SancionUserRetraso = 1920
                    }
                }
                SancionUserRetraso = SancionUserRetraso / 60

                let SancionesUserFaltas = sumaUserFaltas * 2

                const horas_faltadas = (SancionesUserFaltas * 480) / 60
                const min_extra = sumaUserExtra / 60
                let hrs_no_recuperadas = SancionUserRetraso + SancionesUserFaltas - min_extra
                hrs_no_recuperadas = Math.round(hrs_no_recuperadas * 100) / 100;
                if (hrs_no_recuperadas < 0) {
                    hrs_no_recuperadas = 0
                }
                const UpdateHrsNoRecuperadas = await Asistencia.update({
                    hrs_no_recuperadas: `${hrs_no_recuperadas}`
                }, {
                    where: {
                        usuario_id: userRetraso.usuario_id
                    }
                }
                )
                /////LOS DESCUENTOS SE REALIZARAN EN LA BOLETA  

            }

            res.status(200).json({
                ok: true,
                msg: 'Registro completo'
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                msg: 'Error en el servidor',
                error
            })
        }
    }
    static async getExcel(req, res) {

    }
    static async getByIdExcel(req, res) {

    }
    static async putExcel(req, res) {

    }
    static async deleteExcel(req, res) {

    }

}

///Funciones 
function calcularTiempoTranscurrido(horaInicio, horaFin) {
    // Dividir las horas y minutos
    const [horaInicioHoras, horaInicioMinutos] = horaInicio.split(':').map(Number);
    const [horaFinHoras, horaFinMinutos] = horaFin.split(':').map(Number);

    // Convertir las horas a minutos
    const minutosInicio = horaInicioHoras * 60 + horaInicioMinutos;
    const minutosFin = horaFinHoras * 60 + horaFinMinutos;

    // Calcular la diferencia en minutos
    const diferenciaMinutos = minutosFin - minutosInicio;

    return diferenciaMinutos;
}
module.exports = ControllerExcel