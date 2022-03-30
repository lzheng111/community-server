const Admin = require('../models/Admin')

!(async() =>{
  //注册一个新用户
  // await User.create({
  //   username:'zhangsan',
  //   password:'123'
  // })
  
  //再创建一个用户
  await Admin.create({
    tel:'18929590607',
    username:'李婷',
    password:'123123',

  })

  //登录：查询单个用户
  // const  lzh = await User.findOne({
  //   username:'18320444793',
  //   password:123
  // }) 

  //  console.log('lzh:',lzh);

})()