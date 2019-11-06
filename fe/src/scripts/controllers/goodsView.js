import goodsView from '../views/goods.art'
import get from '../models/http'
import normalAjax from '../models/normalAjax'
export const goods = async (req, res, next) => {
  var result = await get({
    url: '/api/users/signin',
    type: 'get',
  })

    

  if (result.ret) {

     
   const list = async (req, res, next) => {
    let pageCount = 8;
    let page = req.params.page;
     let currentPage = ~~req.params.page || 1
     let result = await normalAjax({
       url: '/api/goods/goodsAll',
       data: {
         start: (currentPage - 1) * pageCount,
         pageCount
       },
       type:"get"
     })
     if(result.data.list.length === 0 && req.params.page !=1){
       let lastPage = page-1
       res.go('/index/goods_list/'+ lastPage)
     }
     let total = result.data.total
     let totalPage =  Array.from({length:Math.ceil (total / pageCount)}, (v,k) => k);
     res.render(goodsView({
       goodsList: result.data.list,
       totalPage,
       currentPage,
       total
     }))
   }
  await list(req,res)
   $(".page-link").on('click',function(){
     _handlePage(req,res,this)
   })
   $(".first-page a").on('click',function(){
     _handlePage(req,res,this, 'prev')
   })
   $(".last-page a").on('click',function(){
     _handlePage(req,res,this,'next')
   })
 
   function _handlePage(req, res, obj, type) {
    let lastPage = $('.pagination').children().length -2
     if (type) {
       if (type === 'prev' ) {
         res.go('/index/goods_list/1')
       } else if (type === 'next') {
         res.go('/index/goods_list/' + lastPage)
       }
   
     } else {
       res.go('/index/goods_list/' + ~~$(obj).text())
     }
   }


    function setTime() {
      var timeagoInstance = timeago();
      timeagoInstance.render(document.querySelectorAll('.time'), 'zh_CN');
    }
    goodsDelete()
    setTime()
    async function _handleSearch(res, value) {
      if(value === ''){
        return res.go('/index/goods')
      }
      
      const searchRes = await normalAjax({
        url: '/api/goods/goods_search',
        data: {
          keywords: value
        },
        type: "get"
      })
      res.render(goodsView({
        goodsList: searchRes.data.message
      }))
      goodsDelete()
      setTime()
    }

    $('body').on('keyup', '#search', (e) => {
      if (e.keyCode === 13) {
        _handleSearch(res, e.target.value)
      }
    })

    $('body').on('click', ".btn-primary", function () {
      res.go('/index/goods_add')
    })
    $('body').on('click', ".change", function () {
      let id = $(this).attr('data-id')
      res.go('/index/goods_update', {
        id
      })
    })

    function goodsDelete() {
      $('.delete').on('click', async function () {
        let id = $(this).attr('data-id')
        var r = confirm("您确定删除该商品吗？");
        if (r == true) {
          const deleteRes = await normalAjax({
            url: '/api/goods/goods_delete',
            type: 'delete',
            data: {
              data: id
            }
          })
          if (deleteRes.ret) {
            alert("删除商品数据成功")
            if(req.params.page){
              res.go('/index/goods_list/'+req.params.page + '?r=' + new Date().getTime())
            }
            else{
              res.go('/index/goods?r=' + new Date().getTime())
            }
           
          } else {
            alert("删除商品数据失败")
          }
        } else {

        }
      })
    }
  } else {
    alert("没有账户权限,请登录")
    location.hash = "/login"
    location.reload();
  }
}