import get  from'../models/http'
class Mail{
    constructor(){
        $('#root').on('click','.get',this.getCode.bind(this))
        $('#root').on('click','.submit-mail',this.submit.bind(this))
    }
   async submit(){
       let account = $('.form-control').val()
        let code = $('.code').val()
        const res =  await get({
            url:'/api/users/mail',
            type: 'post',
            data:{
                mycode : code,
                username:account
            }
         })
         this.codeDeal(res)
    }
    codeDeal(res){
        res = res.data.message
        switch(res){
            case '3':
                alert('验证成功')
                this.change();
                break;
            case '4':
                alert('验证码验证失败')
                break;
            default:
                alert('网络错误')
        }
    }

    change(){
        $('.change').html('请输入新密码')
        $('.submit-mail').remove()
        var txt1 = " <div class='form-group sub'> <a class='btn btn-primary btn-block'><i class='fa fa-sign-in fa-lg fa-fw'></i>提交</a></div> "
        $('.get-code').append(txt1)
        $('.sub').on('click',this.changePassword.bind(this))
        $('.code').val("")
        $('.code').on('input',this.check);
        $('.code').attr("placeholder","请输入新密码")
    }
  async  changePassword(){
        if( /^[0-9a-zA-Z\u4e00-\u9fa5_]{8,20}$/.test($('.code').val()) ){
            let newPassword = $('.code').val()
            let username = $('.form-control').val()
            const res =  await get({
                url:'/api/users/set',
                type: 'post',
                data:{
                    username:username,
                    newPassword:newPassword
                }
             })
             this.newPasswordDeal(res)
        }
        else{
            alert('密码必须8-20位')
        }
    }
    newPasswordDeal(res){
        res = res.data.message;
        switch(res){
            case '5': alert("修改成功，即将跳至登陆页面")
            location.hash = "login"
            break;
            default:alert("修改失败")
        }
    }
    check(){
        if( /^[0-9a-zA-Z\u4e00-\u9fa5_]{8,20}$/.test($('.code').val()) ){
            $(this).css({
                border : '2px solid green'
            })
       }else{
        $(this).css({
            border : '2px solid red'
        })
       }
    }

 async getCode(){  
      $('.code').val("")
    let data = $('.login-form').serialize()

        const res =  await get({
            url:'/api/users/mail',
            type: 'post',
            data
         })
         this.deal(res)
    }
    deal(res){
        res = res.data.message
        switch(res){
            case '1':
                alert('验证码已发送')
                break;
            case '2':
                alert('账号不存在')
                break;
            default :
            alert('网络错误')
        }
    }
}
export default new Mail()