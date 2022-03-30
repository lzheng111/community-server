const router = require('koa-router')()
const {login,register,updatedPwd,updatePersonal,checkPersonal,checkAllPersonal,deletePersonal} = require('../controller/admin')
const {SuccessModel,ErrorModel} = require('../res-model/index')

const {loginUser,addUser,checkUser,checkAllUser,updateUser,deleteUser,deleteManyUser,getUserTel} = require('../controller/user')

var axios = require('axios')
var WXBizDataCrypt = require('../controller/WXBizDataCrypt')

router.prefix('/api/user')


//管理员登录
router.post('/login',async function(ctx,next){
  const {tel,password} = ctx.request.body
  //查询单个用户
  const res = await login(tel,password)
  if(res){
    //登录成功
    ctx.body = {
      errno:0,
      message:'登录成功',
      tel
    }
    ctx.session.userInfo = tel  //设置session
  }else{
    ctx.body = new ErrorModel(10002,'登录失败!请检查账号密码')
  }
})

//新增管理员
router.post('/register',async function(ctx,next){
  const {tel,password,username,sex,level} = ctx.request.body
  //新建管理员 
  try{
    const newAdmin = await register(tel,password,username,sex,level)

    ctx.body = {
      errno:0,
      message:'管理员创建成功',
      data:newAdmin
    }

  }catch(ex){
    console.error(ex) 
    ctx.body = new ErrorModel(10001,`注册失败 - ${ex.message}`)
  }

})

//登录校验
router.get('/check',async (ctx,next) =>{
  let data =ctx.session.userInfo 
  if(data !=null){
    ctx.body = {
    errno : 0,
    message:'管理员验证成功',
    tel:data
    }
  }else{
    ctx.body = {
      errno:10007,
      message:'未登录或者登录以过期'
    }
  } 
})

//修改管理员密码
router.post('/update/pwd',updatedPwd)

//修改管理员资料
router.post('/update/personal',updatePersonal)

//查询单个管理员资料
router.post('/check/personal',checkPersonal)

//查询所有管理员资料
router.post('/check/allpersonal',checkAllPersonal)

//删除管理员
router.post('/delete/personal',deletePersonal)

// ------------------分界线----------------------------//
//解密用户手机号
router.post('/getusertel',getUserTel)
//用户手机号登录
// router.post('/login/tel',loginTel)
//用户账号密码登录
router.post('/login/user',loginUser)
//新增住户
router.post('/add/user',addUser)
//查询单个用户
router.post('/check/user',checkUser)
//查询所有用户
router.post('/check/alluser',checkAllUser)
//修改用户信息
router.post('/update/user',updateUser)
//删除用户信息
router.post('/delete/user',deleteUser)


module.exports = router
