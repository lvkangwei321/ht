import userView from '../views/user.art'
import get from '../models/http'
export const user = async (req, res, next) => {
  var result = await get({
    url: '/api/users/signin',
    type: 'get',
  })
  if(result.ret){
    res.render(userView())
    $('.btn-primary').on('click',function(){
      res.go('/index/user_add')
    })
  }
 else{
   alert("没有账户权限,请登录")
   location.hash = "/login"
   location.reload();
 }
}