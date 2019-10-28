import get from '../models/http'

class Register{
    constructor(){
        $('#root').on('click','.submit-reg',this.getData.bind(this))
        $('#root').on('input','.pass',this.passwordcheck)
        $('#root').on('input','.account',this.accountCheck)
    }

    accountCheck(){
        if( /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test($(this).val()) ){
            $(this).css({
                border : '2px solid green'
            })
       }else{
        $(this).css({
            border : '2px solid red'
        })
       }
    }
    passwordcheck(){
   if( /^[0-9a-zA-Z\u4e00-\u9fa5_]{8,20}$/.test($(this).val()) ){
        $(this).css({
            border : '2px solid green'
        })
   }else{
    $(this).css({
        border : '2px solid red'
    })
   }
    }
  async  getData(){
      if(!(/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test($('.account').val()) &&
      /^[0-9a-zA-Z\u4e00-\u9fa5_]{8,20}$/.test($('.pass').val()))
      ){
          return alert('账号必须为邮箱,密码必须8-20位不能有特殊字符')
      }
     let data = $('.login-form').serialize()
     const res =  await get({
        url:'/api/users/register',
        type: 'post',
        data
     })
     switch(res.data.message){
        case '1' : alert('注册成功') 
        location.hash = 'login'
        break;
        case '2' : alert('账号已存在')
        break;
        default : alert('网络错误')
    }
    }
}
export default new Register()