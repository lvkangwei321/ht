import goods_addView from '../views/goods_add.art'
export const goods_add = function (req, res, next) {
    res.render(goods_addView())
    $('#changeFile').on('change',function(){
        $('.preImg').attr("src",URL.createObjectURL($(this)[0].files[0]));
     })
    $('.return-user').on('click', function () {
        res.go("/index/goods")
    })
    $("#goodsAddForm").Validform(
        {
            tiptype:4,
            btnSubmit:".btn-success",
            callback: function(){
                $('#goodsAddForm').ajaxSubmit((result) => {
                    if (result.ret) {
                        alert("添加商品成功")
                        res.go('/index/goods')
                    } else {
                        alert("添加商品重复")
                    }
                })
                return false
            }
        }
    );
}