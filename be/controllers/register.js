const registerModel = require('../models/register')
const tools = require('../utils/tools')
const register = async function(req, res, next) {
  res.set('Content-Type', 'application/json; charset=utf-8')
  let { account, password } = req.body
  let hash = await tools.hash(password)
   await registerModel.register({
    account,
    password: hash
   })
  res.render('succ', {
    data: JSON.stringify({
      message: '1'
    })
  })
}
const hasUser = async function(req,res,next){
  res.set('Content-Type', 'application/json; charset=utf-8')
  let result = await registerModel.hasUser(req.body)
  if(result.length === 0){
    next();
  }
  else{
    res.render('fail', {
      data: JSON.stringify({
        message: '2'
      })
    })
  }
}
module.exports = {
    register,
    hasUser
}