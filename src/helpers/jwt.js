const jwt = require('jwt-simple')
const moment = require('moment')

var key  =  process.env.SECRETKEY

exports.createTocken = function ( user ,rol){
    var payload = {
        id : user.id_usuario,
        user : user.correo_corp,
        pass : user.password,
        rol : rol,
        iat : moment().unix(),
        ext : moment().add('60', 'minute').unix(),
    }
    return jwt.encode(payload, key);
}