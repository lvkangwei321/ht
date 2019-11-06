 const normalAjax = function({
    url,
    data={},
    type='post'
  }) {
    return $.ajax({
      url,
      data,
      type,
      success(result) {
        return result
      }
    })
  }
  export default normalAjax;