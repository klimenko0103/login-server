
var jwt = require('jwt-simple')

var config = require('./config')
// console.log('wsbbwsk')

var auth = function(req, res, next){
    try {
        var auth = jwt.decode(req.headers['x-auth'], config.secretkey)
        req.auth = auth;
        // console.log(auth)
        next();
    } catch (err) {
        return  res.sendStatus(401)
    }
}
module.exports = auth