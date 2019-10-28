const {User} = require('../utils/db')
const register = (data) => {
    const user = new User(data)
              user.save();
  }
  const hasUser = (data)=>{
    const user = new User(data)
    return  User.find({ 'account': user.account },  function (err, res) {
      if(err){
        console.log(err);
      }
      });
  }
  module.exports = {
    register,
    hasUser
  }