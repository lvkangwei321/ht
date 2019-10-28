const loginModel = require('../models/login')
const tools = require('../utils/tools')
const check = async function(req, res, next) {
  res.set('Content-Type', 'application/json; charset=utf-8')
  let { account, password } = req.body
  let result = await loginModel.findOne({account})
  if (result.length !== 0) {
    let compareResult = await tools.compare(password, result[0].password)
    if (compareResult) {
      req.session.username = result[0].account; 
      res.render('succ', {
        data: JSON.stringify({
          account: result[0].account,
          message: '1'
        })
      })
    } else{
      res.render('fail', {
        data: JSON.stringify({
          message: '3'
        })
      })
    }
  } else {
    res.render('fail', {
      data: JSON.stringify({
        message: '2'
      })
    })
  }
}
const signin = function(req,res){
  res.set('Content-Type', 'application/json; charset=utf-8')
  if(req.session.username){
    res.render('succ', {
      data: JSON.stringify({
        message: '已经拥有账户权限',
        account:req.session.username
      })
    })
  }
  else{
    res.render('fail', {
      data: JSON.stringify({
        message: '未拥有账户权限'
      })
    })
  }
}
const signOut = function(req,res){
  req.session = null;
  res.render('succ', {
    data: JSON.stringify({
      message: '注销成功.'
    })
  })
}
module.exports = {
    check,
    signin,
    signOut
}