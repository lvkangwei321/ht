import goodsView from '../views/goods.art'
import get from '../models/http'
export const goods = async (req, res, next) => {
  var result = await get({
    url: '/api/users/signin',
    type: 'get',
  })
  if(result.ret){
    res.render(goodsView())
  }
 else{
   alert("没有账户权限,请登录")
   location.hash = "/login"
   location.reload();
 }
}