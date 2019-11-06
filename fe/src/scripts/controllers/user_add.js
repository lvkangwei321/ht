import user_addView from '../views/user_add.art'
import get from '../models/http'
export const user_add = function(req,res,next){
    res.render(user_addView())
    $('.return-user').on('click',function(){
        res.go("/index/user")
    })
}