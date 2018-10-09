var router = require('express').Router() ;
var crypto = require('crypto');
var User = require('./user');


router.put('/profile', function (req, res, next) {
    console.log('body', req.body);
    // User.update({token : req.body.token}, { age : 25}, {upsert: true})
    // console.log(req.body._id);
    User.findOne({_id: req.body._id})
        .exec(function (err, user) {
            if (err) {
                console.log(err);
                return res.sendStatus(500)
            }
            else {
                if (req.body.gender !== '') {
                    user.gender = req.body.gender;
                }
                console.log('22222', user.gender)

                if (req.body.username !== '') {
                    user.username = req.body.username;
                }
                if (req.body.age !== '') {
                    user.age = req.body.age;
                }
                if (req.body.password !== '') {
                    // user.encryptPass(req.password);
                    // console.log('uuuuuuuuuuuuuuuuuuuuuuuuuuuuu',req.body.password);
                    // console.log(user.encryptPass(user.password))
                    // console.log(user.encryptPass(req.body.password));
                    user.password = crypto.createHash('md5').update(req.body.password, 10).digest('hex');
                }


                user.save(function () {
                    if (err) {
                        res.sendStatus(500)
                    }
                    else {
                        res.sendStatus(201)
                        console.log('save', user)
                        // res.json(user)
                        // console.log('save', req.body)
                        // console.log('eeeeeeeeeeeeeeeeeeeeeeeeee', user.username);
                    }

                })
            }
        })

});

// User.findOne({token: req.token}, function(err, user) {
//     if (err) {
//         console.log(err);
//         return res.sendStatus(500)
//     }
//     else {
//         user.save(function () {
//             console.log('save', user)
//             // return  res.json(user)
//         })
//     }
// })


    // var uss =  User.findOne({token: req.token});
    // // console.log(JSON.stringify(uss))
    // console.log(JSON.parse(uss))




// console.log(user)
// if (user.password){
//     user.encryptPass(user.password);
//     console.log('userppppppass',user.password);
// }
module.exports = router