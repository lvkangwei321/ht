const {Goods} = require('../utils/db')
const goodsSave = (data) => {
    const goods = new Goods(data)
        goods.save();
  }
  const hasGoods = (data)=>{
    const goods = new Goods(data)
    return  Goods.find({ 'goodsName': goods.goodsName },  function (err, res) {
      if(err){
        console.log(err);
      }
      });
  }
  const goodsAll = async ({start,pageCount})=>{
    let list =  await Goods.find({}).sort({_id: -1}).limit(~~pageCount).skip(~~start);
    let total = await Goods.find({}).count();
    return {list,total}
}
  const goodsUpdate = (data)=>{
    return   Goods.findByIdAndUpdate(data.id, data)
  }
  const goodsDelete = (data)=>{
    return Goods.deleteOne({_id:data})
  }
  const goodsFindOne = (data)=>{
    return Goods.findOne({_id:data})
  }
  const goodsSearch = (keywords)=>{
    let reg = new RegExp(keywords)
    return Goods.find({}).or([{goodsName:reg},{goodsIntro:reg}]).sort({_id: -1})
  }
  module.exports = {
    goodsSave,
    hasGoods,
    goodsAll,
    goodsUpdate,
    goodsDelete,
    goodsFindOne,
    goodsSearch
  }