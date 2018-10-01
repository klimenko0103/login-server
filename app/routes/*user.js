var router = require('express').Router() ;

var crypto = require('crypto');


var User = require('./user')

var auth = require('./auth')


/**
 * При поступлении запроса типа POST эта функция шифрует пароль
 * с помощью bcrypt и сохраняет результат в БД.
 * При любых ошибках выдает статус 500 - Internal Server Error
 * При удаче - возвращает 201
 */
router.post('/user', function (req, res, next) {
    var user = new User({
        username :req.body.username,
        age: req.body.age,
        email : req.body.email,
        login : req.body.login,
        password : req.body.password,
    });

    var hash = crypto.createHash('md5').update(req.body.password, 10).digest('hex');
    // console.log('sadasd', hash)
    user.password = hash;

    user.save(function (err) {
        if (err) {

            res.sendStatus(500)
        }
        else {
            res.sendStatus(201)
        }
        console.log('save', user)
    })
    // console.log('savedddddd', user)
});

/**
 * При поступлении запроса типа GET эта функция
 * проверяет наличие заголовка типа x-auth, при его отсутствии
 * возвращает 401 - Unauthorized. При наличии расшифровывает токен,
 * содержащийся в заголовке с помощью jwt,
 * затем ищет пользователя с оным именем в базе данных.
 * При любых ошибках возвращает 500 - Internal Server Error
 * При успехе возвращает JSON объекта user (без пароля, естественно)
 */
router.get('/user', auth, function (req, res, next) {
    console.log(req.auth.login)
    // console.log('skjnhkjsk');
    if(!req.headers['x-auth']) {
        return res.sendStatus(401)
    }
    User.findOne({login: req.auth.login}, function(err, user) {
        if (err) {
            console.log(err);
            return res.sendStatus(500)
        }
        else {
            res.json(user)
        }
    })
})

module.exports = router

