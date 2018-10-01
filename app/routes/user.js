
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test',{ useNewUrlParser: true });

var userSchema = new mongoose.Schema({
    username: { type: String},
    age: { type: String},
    email:{ type: String, unique: true, index: true},
    login:{ type: String},
    password: { type: String, select: false}
})

var User = mongoose.model('User',userSchema);

module.exports = User

