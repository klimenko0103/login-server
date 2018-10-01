
var router = require('express').Router()

var crypto = require('crypto');

var jwt = require('jwt-simple')

var User = require('./user')

var config = require('./config')

/**
 * Этот модуль имеет единственный метод.
 * При получении запроса типа POST, в котором содержится логин и пароль,
 * эта функция ищет в БД пользователя с таким username,
 * получает хеш его пароля и сверяет с помощью bcrypt с полученным
 * в запросе паролем. При ошибках обработки возвращает статус 500.
 * При неправильных данных - 401 - Unauthorized.
 * При успехе возвращает токен.
 */

router.post ('/login', function(req, res, next) {
    // console.log(req.body)
    // console.log(user.password)

    if (!req.body.login || !req.body.password) {
        // если один или оба параметра запроса опущены,
        // возвращаем 400 - Bad Request
        return res.sendStatus(400)
    } else {
        var login = req.body.login;
        var password = req.body.password;
        User.findOne({login: login})
            .select('password')
            .exec(function (err, user) {
                    if (err) {
                        return res.sendStatus(500)
                    }
                    if (!user) {
                        return res.sendStatus(401)
                    }
                   if (crypto.createHash('md5').update(password).digest('hex') !== user.password){
                        return true
                   };
                    var token = jwt.encode({login: login}, config.secretkey)
                    res.send(token)
                                }
            )
    }
})

module.exports = router