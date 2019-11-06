const loginModel = require('../models/login')
const tools = require('../utils/tools')
const check = async function(req, res, next) {
  res.set('Content-Type', 'application/json; charset=utf-8')
  let { account, password } = req.body
  let result = await loginModel.findOne({account})
  global.account = result[0].account
  if (result.length !== 0) {
    let compareResult = await tools.compare(password, result[0].password)
    if (compareResult) {
      let token = await tools.generateToken(account)
      res.header('X-Access-Token', token)
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
const signin =async function(req,res){
  res.set('Content-Type', 'application/json; charset=utf-8')
  let token = req.get('X-Access-Token')
  let decoded = await tools.verifyToken(token)
  if(decoded){
    res.render('succ', {
      data: JSON.stringify({
        message: '已经拥有账户权限',
        account :  global.account
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