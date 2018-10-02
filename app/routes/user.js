var crypto = require('crypto');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test',{ useNewUrlParser: true });

var userSchema = new mongoose.Schema({
    username: { type: String},
    age: { type: String},
    email:{ type: String, unique: true, index: true},
    login:{ type: String},
    password: { type: String, select: false}
});

userSchema.methods.encryptPass = function(){
    // this -> user object
    var pass = crypto.createHash('md5').update(this.password, 10).digest('hex');
    console.log('hash', pass);
    return this.password = pass;
};


var User = mongoose.model('User',userSchema);

module.exports = User;

