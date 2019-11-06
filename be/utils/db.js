const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lkw',{useNewUrlParser: true, useUnifiedTopology: true});

const User = mongoose.model('users', { account: String,password:String,code:String});

const Goods = mongoose.model('goods', { goodsName: String,
    goodsIntro:String,goodsPrice:String,goodsLogo:String,
    goodsId:Number,createTime:String});
    
    const Goodsdetails = mongoose.model('details', {goodsId:Number},'details');
module.exports = { User,Goods,Goodsdetails }