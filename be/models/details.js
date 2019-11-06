const {Goodsdetails} = require('../utils/db')
const findDetail = async function(data){
    console.log(data);
    let findRes = await Goodsdetails.find({goodsId:~~data})
    console.log(findRes);
        return findRes
}
module.exports = {findDetail}