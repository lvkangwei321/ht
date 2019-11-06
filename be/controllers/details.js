const {findDetail} = require('../models/details')
const findDetails = async function(req,res,next){
  res.set('Content-Type', 'application/json; charset=utf-8')
  let result =   await findDetail(req.query.goodsId)
  res.render('succ', {
    data: JSON.stringify({
      message: result
    })
  })
}
module.exports = {findDetails}