let Admin = require('../models/Admin')

//新增管理员
async function register(tel,password,username,sex,level){
  //保存到数据库
  const newAdmin = await Admin.create({tel,password,username,sex,level})

  return newAdmin
}



//管理员登录
async function login(tel,password){
  const admin = await Admin.findOne({tel,password})
  if(admin !=null){
    return true
  }
  return false
}

//修改管理员密码
const updatedPwd = async ctx =>{
  let{tel,password} = ctx.request.body
  await Admin.updateOne(
    {tel},
    {password},
    
  ).then(rel =>{
    console.log(rel);
     if(rel.matchedCount >0){
       ctx.body = {
         errno:0,
         message:'密码修改成功'
       }
    }else{
      ctx.body = {
        errno:10004,
        message:'密码修改失败'
      }
    }
  }).catch(err =>{
      ctx.body = {
      errno:10004,
      message:'密码修改失败',err
}
})
}

//修改管理员资料
const updatePersonal = async ctx =>{
  const admin = ctx.request.body

  await Admin.updateOne(
    {_id: admin._id},
    { 
      tel:admin.tel,
      username:admin.username,
      password:admin.password,
      sex:admin.sex,
      level:admin.level
    }
  ).then(rel =>{
    if(rel.matchedCount > 0){
      ctx.body = {
        errno:0,
        message:'管理员资料修改成功',    
      }
    }else{
      ctx.body = {
        errno:10005,
        message:'管理员资料修改失败'
    }
    }
  }).catch(err =>{
      ctx.body = {
      errno:10005,
      message:'管理员资料修改失败',err
  }
  })
}

//查询管理员
const checkPersonal = async ctx =>{
  let {tel} = ctx.request.body
  await Admin.findOne({tel}).then(rel =>{
    if(rel !==0){
      ctx.body = {
        errno:0,
        data:rel
      }
    }else{
      ctx.body ={
        errno : 10008,
        message:'查询失败或者没有该管理员'
      }
    }
  }).catch(err =>{
    ctx.body ={
      errno : 10008 ,
      message:'查询失败或者没有该管理员',err
    }
  })
}

//查询所有管理员信息
const checkAllPersonal = async ctx =>{
  await Admin.find().sort({_id:-1}).then(rel =>{
    if(rel){
      ctx.body = {
        errno:0,
        message:'查询所有管理员成功',
        data:rel
      }
    }else{
      ctx.body = {
        errno:-10010,
        message:'查询所有管理员失败',
    }
  }
  }).catch(err =>{
    ctx.body = {
      errno:-10010,
      message:'查询所有管理员失败',err
  }
  })
}

//删除管理员信息
const deletePersonal = async ctx =>{
  const{tel} = ctx.request.body
  await Admin.remove({tel}).then(rel =>{
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



module.exports ={
  login,
  register,
  updatedPwd,
  updatePersonal,
  checkPersonal,
  checkAllPersonal,
  deletePersonal
}