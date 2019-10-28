const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lkw',{useNewUrlParser: true, useUnifiedTopology: true});

const User = mongoose.model('users', { account: String,password:String,code:String});

module.exports = { User }