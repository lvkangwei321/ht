import get from '../models/http'
class Layout {
  constructor() {
    $(window).on('load hashchange',function(){
      if (location.hash.slice(2, 7) === 'index') {
        var render = async function () {
          const res = await get({
            url: '/api/users/signin',
            type: 'get',
          })
          $('.user-name').html(res.data.account)
        }
        render()
      }
    })
    
    $('#root').on('click', '.login', async function () {
      await get({
        url: '/api/users/signOut',
        type: 'get'
      })
      location.reload()
    })
  }
}

export default new Layout()