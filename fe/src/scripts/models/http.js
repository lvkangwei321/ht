const get = function({
    url,type,data
}){
  return $.ajax({
        url,
        type,
        data,
        success: function(res){
          return res
        }
      })
}
export default get;