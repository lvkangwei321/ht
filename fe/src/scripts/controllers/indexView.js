import layoutView from '../views/layout.art'
export const index = (req, res, next) => {
  next(eval(layoutView()))
    let url = req.url.slice(7)
    if(url){
      $(`.app-menu li[data-url=${url}]`).addClass('active').siblings().removeClass('active')
    }
}