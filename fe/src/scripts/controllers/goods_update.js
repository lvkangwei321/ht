import goods_updateView from '../views/goods_update.art'
import normalAjax from '../models/normalAjax'
export const goods_update = async function(req,res,next){
    let id = req.body.id
    let result = await normalAjax({
        type:'post',
        url:'/api/goods/goods_findOne',
        data:{
            id:id
        }
    })
    res.render(goods_updateView({
        goodsList:result.data.message
    }))
    $('#changeFile').on('change',function(){
       $('.preImg').attr("src",URL.createObjectURL($(this)[0].files[0]));
    })
    $('.btn-success').on('click',async function(){
        let data = $('.form-group').serialize()
        let dataList  = data.split("&")
        for(var i = 0;i < dataList.length ; i++){
           var arr =   dataList[i].split("=")
           var reg = /^\s*$/g;
              if(reg.test(arr[1]) || arr[1] == null || arr[1] == ""){
                  return alert("数据不能为空")
              }
        }
            $('#goodsUpdateForm').ajaxSubmit({
                type: 'post', 
                url: '/api/goods/goods_update', 
                data:{
                    id:id
                },
                success: function(updateRes) { 
                    if(updateRes.ret){
                        alert("修改商品数据成功")
                        res.go('/index/goods')
                    }
                    else{
                        alert("修改商品数据失败")
                    }
                }
            });

        })
    $('.return-user').on('click',function(){
        res.back()
    })
}


