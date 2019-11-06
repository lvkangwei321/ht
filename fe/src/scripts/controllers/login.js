import get from '../models/http'

class Login{
    constructor(){
        $('#root').on('click','.login-submit',this.getData.bind(this))
    }
  async  getData(){
            let data = $('.login-form').serialize()
            const res =  await get({
               url:'/api/users/login',
               type: 'post',
               data
            })
            switch(res.data.message){
                    case '1' : alert('登录成功')
                    localStorage.setItem("currentPage",1)
                    location.hash = '/index/user'
                    break;
                    case '2' : alert('账号不存在')
                     break;
                    case '3': alert('密码错误')
                    break;
                    default : alert('网络错误')
           }
    }
}
export default new Login()