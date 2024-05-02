const jwt = require('jwt-simple')
const moment = require('moment')

var key  =  process.env.SECRETKEY

exports.createTocken = function ( user ,rol){
    var payload = {
        id : user.id,
        user : user.correo_corp,
        pass : user.password,
        rol : rol,
        id_user : user.id_usuario,
        estado : user.estado,
        iat : moment().unix(),
        ext : moment().add('60', 'minute').unix(),
    }
    return jwt.encode(payload, key);
}