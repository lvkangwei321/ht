const {User} = require('../utils/db')
const findOne = (data) => {
  const user = new User(data)
  return  User.find({ 'account': user.account },  function (err) {
    if(err){
      console.log(err);
    }
    });
  }
  module.exports = {
    findOne,
  }