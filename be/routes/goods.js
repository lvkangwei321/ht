var express = require('express');
var router = express.Router()
let {goods_add,getgoodsAll,goods_update,goods_delete,findGoods,searchGoods} = require('../controllers/goods')
let {findDetails} = require('../controllers/details')
let upload = require('../middleware/multer')
router.post('/goods_add',upload, goods_add)
router.post('/goods_update',upload, goods_update)
router.delete('/goods_delete',goods_delete)
router.get('/goodsAll', getgoodsAll)
router.post('/goods_findOne', findGoods)
router.get('/goods_search', searchGoods)
router.get('/goods_details',findDetails)
module.exports = router