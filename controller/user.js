const axios = require('axios')
let User = require('../models/User')
const WXBizDataCrypt = require('./WXBizDataCrypt')

const getUserTel = async ctx =>{
  // let data = ctx.request.body
    let{encryptedData,iv,appid,secret,code,session_key} =  ctx.request.body
    // let result = await axios({
    //   url:'https://api.weixin.qq.com/sns/jscode2session?appid='+appid+'&secret='+secret+'&js_code='+code+'&grant_type=authorization_code',
    //   method:'GET'
    // })
    // console.log('axios获取的数据是:',result);
    var pc = new WXBizDataCrypt(appid,session_key)
    var data = pc.decryptData(encryptedData,iv)
    ctx.body={
      value:data
    }

}

//注册用户
const addUser = async ctx =>{
  let {tel,password,name,sex,site,area,park,carnumber,carsite, avatar} = ctx.request.body
  await User.create({tel,password,name,sex,site,area,park,carnumber,carsite, avatar})
    .then(rel =>{
      ctx.body = {
        errno : 0,
        message:'注册用户成功',
        data:rel
      }
    })
}

//用户手机号登录
// const loginTel = async ctx =>{
//   let {tel} = ctx.request.body
//   await findOne(tel).then(rel =>{
//     if(rel){
//       ctx.body ={
//         errno:0,
//         data:rel
//     }     
//      } else{
//       ctx.body = {
//         errno:10021,
//         message:'登录失败'   
//       }
//     } 
//   }).catch(err =>{
//     ctx.body = {
//       errno:10021,
//       message:'登录失败' ,err  
//     }
//   })
// }

//用户账号密码登录
const loginUser = async ctx =>{
  let {tel,password} = ctx.request.body
  await User.findOne({tel,password}).then(rel =>{
     if(rel){
      ctx.body ={
        errno:0,
        data:rel
    }     
     }
     else{
       ctx.body = {
         errno:10021,
         message:'登录失败'   
       }
     } 
  }).catch(err =>{
    ctx.body = {
      errno:10021,
      message:'登录失败' ,err  
    }
  })
  
}

//查询单个用户信息
const checkUser = async ctx =>{
  let{tel} = ctx.request.body
  await User.findOne({tel}).then(rel =>{
    console.log(rel);
    if(rel !==null){
      ctx.body ={
        errno:0,
        message:'查询用户成功',
        data:rel
      }
    }else{
      ctx.body ={
        errno : 10008,
        message:'查询失败或者没有该用户'
      }
    }
  }).catch(err =>{
    ctx.body ={
      errno : 10008,
      message:'查询失败或者没有该用户',err
    }
  })
}

//查询所有用户
const checkAllUser = async ctx =>{
  await User.find().sort({_id:-1}).then(rel =>{
    if(rel){
      ctx.body = {
        errno:0,
        message:'查询所有用户成功',
        data:rel
      }
    }else{
      ctx.body = {
        errno:-10010,
        message:'查询所有用户失败',
    }
  }
  }).catch(err =>{
    ctx.body = {
      errno:-10010,
      message:'查询所有用户失败',err
  }
  })
}

//修改用户信息
const updateUser = async ctx =>{
  const profile = ctx.request.body
  await User.updateOne(
    {_id: profile._id},
    {
      tel:profile.tel,
      password:profile.password,
      name: profile.name,
      sex:profile.sex,
      site:profile.site,
      area:profile.area,
      park:profile.park,
      carnumber:profile.carnumber,
      carsite:profile.carsite,
      avatar:profile.avatar
    }
  ).then(rel =>{
    if(rel.matchedCount > 0){
      ctx.body = {
        errno:0,    
        message:'用户资料修改成功',       
      }
    }else{
      ctx.body = {
        errno:10015,
        message:'用户资料修改失败'
    }
    }
  }).catch(err =>{
    ctx.body = {
    errno:10015,
    message:'用户资料修改失败',err
}
})
}
//删除用户信息
const deleteUser = async ctx =>{
  const{tel} = ctx.request.body
  await User.remove({tel}).then(rel =>{
    if(rel.deletedCount === 1){
      ctx.body ={
        errno:0,
        message:"删除用户成功"
      }
    }else{
      ctx.body ={
        errno:10011,
        message:"删除用户失败"
      }
    }
  }).catch(err =>{
    ctx.body ={
      errno:10011,
      message:"删除用户失败",err
    }
  })
}
// 批量删除用户信息
// const deleteManyUser = async ctx =>{
//   const deleteData = ctx.request.body
//   console.log('传入的删除数组：',deletaData);
//   await User.deleteOne({deleteData}).then(rel =>{
//     console.log(rel);
    
//   })
// }

module.exports ={
  // loginTel,
  loginUser,
  addUser,
  checkUser,
  checkAllUser,
  updateUser,
  deleteUser,
  getUserTel
  // deleteManyUser
}