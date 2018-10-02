
var router = require('express').Router();

var jwt = require('jwt-simple');

var User = require('./user');

var config = require('./config');

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

    if (!req.body.login || !req.body.password) {
        return res.sendStatus(400)
    } else {
        let params = req.body;
        var userAuth = new User({
            login : params.login,
            password : params.password,
        });
        // console.log(user.password)
        // userAuth.encryptPass(userAuth.password)
        // console.log('posthash',userAuth.password)

        User.findOne({login: userAuth.login})
            .select('password')
            .exec(function (err, user) {
                    if (err) {
                        return res.sendStatus(500)
                    }
                    if (!user) {
                        return res.sendStatus(404)
                    }
                    // console.log('bd',user.password)
                    // console.log('body',userAuth.encryptPass(userAuth.password))

                     if (userAuth.encryptPass(userAuth.password)!== user.password){
                       return res.sendStatus(401)
                     }

                    var token = jwt.encode({login: userAuth.login}, config.secretkey);
                    res.send(token)
            }
            )
    }
})

module.exports = router