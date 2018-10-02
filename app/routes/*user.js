var router = require('express').Router() ;

var User = require('./user');

var auth = require('./auth').auth;


/**
 * При поступлении запроса типа POST эта функция шифрует пароль
 * с помощью bcrypt и сохраняет результат в БД.
 * При любых ошибках выдает статус 500 - Internal Server Error
 * При удаче - возвращает 201
 */
router.post('/user', function (req, res, next) {
    let params = req.body;
    var user = new User({
        username :params.username,
        age: params.age,
        email : params.email,
        login : params.login,
        password : params.password,
    });

    user.encryptPass(user.password);
    console.log('userpass',user.password);

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

module.exports = router;

