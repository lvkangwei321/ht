const { goodsSave,hasGoods,goodsAll,goodsUpdate,goodsDelete,goodsFindOne
,goodsSearch} = require('../models/goods')
const moment = require('moment')
const path =require('path')
var fs = require('fs');
  const goods_add = async function(req,res,next){
    const result = await hasGoods(req.body)
    if(result.length === 0){
      let data = req.body
      data.createTime = moment().format('YYYY-MM-DD HH:mm:ss')
      data.goodsLogo = req.filename
      delete req.filename
      await goodsSave(data)
      res.set('Content-Type', 'application/json; charset=utf-8')
        res.render('succ', {
          data: JSON.stringify({
            message: '储存成功'
          })
        })
      }
      else{
        res.set('Content-Type', 'application/json; charset=utf-8')
        res.render('fail', {
          data: JSON.stringify({
            message: '储存失败'
          })
        })
      }
    }

    const getgoodsAll = async function(req,res,next){
     const allGoods =  await goodsAll(req.query);
     res.set('Content-Type', 'application/json; charset=utf-8')
     res.render('succ', {
       data: JSON.stringify({
         list: allGoods.list,
         total:allGoods.total
       })
     })
    }

    const goods_update = async function(req,res,next){
      res.set('Content-Type', 'application/json; charset=utf-8')
      let data = req.body;
      if(req.filename){
        const changeOne =    await goodsFindOne(data.id)
        fs.unlink(path.resolve(__dirname,`../public/upload/${changeOne.goodsLogo}`),()=>{
        })
      }
      data.createTime = moment().format('YYYY-MM-DD HH:mm:ss')
      if(req.filename){
        data.goodsLogo = req.filename
        delete req.filename
      }
      else{
        delete data.goodsLogo;
      }
    
      
      const updateRes = await goodsUpdate(data)
      if(updateRes){
        res.render('succ', {
          data: JSON.stringify({
            message: '修改成功'
          })
        })
      }
      else{
        res.render('fail', {
          data: JSON.stringify({
            message: "修改失败"
          })
        })
      }
    }

    const goods_delete = async function(req,res,next){
      res.set('Content-Type', 'application/json; charset=utf-8')
      const deleteOne =    await goodsFindOne(req.body.data)
    const deleteRes =    await goodsDelete(req.body.data)
    fs.unlink(path.resolve(__dirname,`../public/upload/${deleteOne.goodsLogo}`),()=>{
    })
    if(deleteRes){
      res.render('succ', {
        data: JSON.stringify({
          message: '删除成功'
        })
      })
    }
    else{
      res.render('fail', {
        data: JSON.stringify({
          message: '删除失败'
        })
      })
    }
    }

    const findGoods = async function(req,res,next){
      res.set('Content-Type', 'application/json; charset=utf-8')
      const findRes = await goodsFindOne(req.body.id)
      res.render('succ', {
        data: JSON.stringify({
          message: findRes
        })
      })

    }

    const searchGoods = async function(req,res,next){
      res.set('Content-Type', 'application/json; charset=utf-8')
      const searchRes = await goodsSearch(req.query.keywords)
      res.render('succ', {
        data: JSON.stringify({
          message: searchRes
        })
      })
    }

  module.exports = {
    goods_add,
    getgoodsAll,
    goods_update,
    goods_delete,
    findGoods,
    searchGoods
  }