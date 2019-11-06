import layoutView from '../views/layout.art'
import titleView from '../views/title.art'
export const index = (req, res, next) => {
  next(eval(layoutView()))
  let bread = req.url.slice(7).split("?")[0].split('/')[0]
  let BreadcrumbMap = {
    'user': {
      level1: '用户数据管理',
    },
    'goods': {
      level1: '商品数据管理'
    },
    'goods_update':{
      level1: '商品数据管理',
      level2: '商品数据更新',
    },
    'goods_add':{
      level1: '商品数据管理',
      level2: '商品数据添加'
    },
    'goods_list':{
      level1: '商品数据管理'
    }
  }
  let TitleMap = {
    'user': {
      title: '用户数据管理',
      subtitle: '更改用户数据'
    },
    'goods': {
      title: '商品数据管理',
      subtitle: '更改商品数据'
    },
    'goods_update': {
      title: '商品数据管理',
      subtitle: '商品数据更新'
    },
    'goods_add': {
      title: '商品数据管理',
      subtitle: '添加商品数据'
    },
    'goods_list':{
      title: '商品数据管理',
      subtitle: '添加商品数据'
    }
  }
  let info = {
    Breadcrumb: {
      level1: BreadcrumbMap[bread].level1,
      level2: BreadcrumbMap[bread].level2,
    },
    Title: {
      title: TitleMap[bread].title,
      subtitle: TitleMap[bread].subtitle
    }
  }
  
  let html = titleView({
    title: info.Title,
    breadcrumb: info.Breadcrumb
  })
  $('.app-title').html(html)
  bread = bread.split("_")[0]
    if(bread){
      $(`.app-menu li[data-url=${bread}]`).addClass('active').siblings().removeClass('active')
    }
}