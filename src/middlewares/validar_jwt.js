const { request, response } = require('express');
const jwt = require('jsonwebtoken');
//  importacion de los modelos
const {Autentificacion} = require('../models/autentificacion.model')


const validarJWT =  async(req  =request, res =response, next)=>{
    //console.log(req.headers);
    const token =  req.header('x-token')
    //console.log(token);
    if (!token){
        return res.status(410).json({
            msg: 'No hay tocken en la consulta'
        })
    }
    try {
        const payload =  jwt.verify(token,process.env.SECRETKEY)
        //console.log(payload);
        //console.log(payload);
        const usuario =  await Autentificacion.findAll({
            where :{
                id : payload.id
            },
            //attributes : [''], 
            //include
        })
        console.log(usuario);
        if (!usuario[0]){
            return res.status(410).json({
                msg : 'Usuario no existente'
            })
        }
        //console.log(usuario[0]);
        if (usuario[0].estado =='n'){
            return res.status(401).json ({
                msg : 'Usuario sin acceso al sistema'
            })
        }
        req.usuario = {
            usuario: usuario[0],
            rol: payload.rol}
        next ();
    } catch (error) {
        console.log(error);

        res.status(401).json({
            msg: 'Token no valido.',
            error:error.message
        })
    }
}
module.exports = {
    validarJWT
}