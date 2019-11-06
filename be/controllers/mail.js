const {sendMail,findOne,changePassword,setCode} = require('../models/email')
const tools = require('../utils/tools')
const mailBoom = async function(req,res){
  res.set('Content-Type', 'application/json; charset=utf-8')
  const{account} = req.body
  var {mycode} = req.body
  if(account != undefined){
    code = ""
    let codeArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 
    'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    let length = 6; 
    for (let i = 0; i < length; i++)
     { 
       let randomI = Math.floor(Math.random() * 36);
       code+=codeArr[randomI];
      }
     await setCode({"account":account,"code":code})
     let findRes = await findOne(req.body)
      if(findRes.length === 0){
        res.render('succ', {
          data: JSON.stringify({
            message: '2'
          })
        })
      }
      else{
        sendMail(account,code)
        res.render('succ', {
          data: JSON.stringify({
            message: '1'
          })
        })
      }
    
    }
    if(mycode != undefined){
     let username = req.body.username;
     let result =  await findOne({"account":username})
      if(mycode == result[0].code){
        res.render('succ', {
          data: JSON.stringify({
            message: '3'
          })
        })
      }
      else{ 
        res.render('fail', {
          data: JSON.stringify({
            message: '4'
          })
        })
      }
    }
  }
 const setPassword = async function(req,res){
  res.set('Content-Type', 'application/json; charset=utf-8')
  var {newPassword,username} = req.body
  let hash = await tools.hash(newPassword)
  await changePassword({
    "account":username,
    "password": hash
  })
  res.render('succ', {
    data: JSON.stringify({
      message: '5'
    })
  })
 }
 
module.exports = {mailBoom,setPassword}