import store from 'store';
const get = function({
    url,type,data
}){
  let token = store.get('token')
  return $.ajax({
        url,
        type,
        data,
        headers: {
          'X-Access-Token': token
        },
        success: function(res,textStatus, jqXHR){
          let token = jqXHR.getResponseHeader('x-access-token')
          if (token) {
            store.set('token', token)
          }
          return res
        }
      })
}
export default get;