let Pay = require('../models/Pay')

//新增缴费信息
const addPay = async ctx =>{
  let{content,tel,name,site,area,money,state,toggle} = ctx.request.body
  await Pay.create({content,tel,name,site,area,money,state,toggle})
    .then(rel =>{
      ctx.body = {
        errno : 0,
        message:'缴费信息增加成功',
        data:rel
      }
    }).catch(err =>{
      ctx.body = {
        errno : 10002,
        message:'缴费信息增加失败',err
      }
    })
}

//查询单用户缴费信息
const checkPay = async ctx =>{
  let{tel} = ctx.request.body
  await Pay.find({tel}).then(rel =>{
    if(rel !==0){
      ctx.body ={
        errno:0,
        message:'缴费信息查询成功',
        data:rel
      }
    }else{
      ctx.body ={
        errno : 10008,
        message:'缴费信息查询失败'
      }
    }
  }).catch(err =>{
    ctx.body ={
      errno : 10008,
      message:'缴费信息查询失败',err
    }
  })
}


//查询全部用户待缴费订单
const checknoPay = async ctx =>{
  await Pay.find({state:'待缴费'}).then(rel =>{
    if(rel !==0){
      ctx.body ={
        errno:0,
        message:'待缴费缴费订单查询成功',
        data:rel
      }
    }else{
      ctx.body ={
        errno : 10008,
        message:'待缴费缴费订单查询失败'
      }
    }
  }).catch(err =>{
    ctx.body ={
      errno : 10008,
      message:'待缴费缴费订单查询失败',err
    }
  })
}

//查询单用户待缴费订单
const checkUserNoCheck = async ctx =>{
  const{tel} = ctx.request.body
  await Pay.find({tel,state:'待缴费'}).then(rel =>{
      ctx.body={
        errno:0,
        message:'查询成功',
        data:rel
      }
  }).catch(err=>{
    ctx.body={
      errno:10022,
      message:'查询失败',err
      
    }
  })  
}

//查询所有缴费信息
const checkAllPay = async ctx =>{
  await Pay.find().sort({_id:-1}).then(rel =>{
    if(rel){
      ctx.body = {
        errno:0,
        message:'查询所有缴费信息成功',
        data:rel
      }
    }else{
      ctx.body = {
        errno:-10010,
        message:'查询所有缴费信息失败',
    }
  }
  }).catch(err =>{
    ctx.body = {
      errno:-10010,
      message:'查询所有缴费信息失败',err
  }
  })
}

//修改缴费信息
const updatePay = async ctx =>{
  const pay = ctx.request.body
  await Pay.updateOne(
    {_id: pay._id},
    {
      content:pay.content,
      tel:pay.tel,
      name:pay.name,
      site: pay.site,
      area:pay.area,
      money:pay.money,
      state:pay.state,
      toggle:pay.toggle
    }
  ).then(rel =>{
    if(rel.matchedCount > 0){
      ctx.body = {
        errno:0,
        message:'缴费信息修改成功',       
      }
    }else{
      ctx.body = {
        errno:10015,
        message:'缴费信息修改失败'
    }
    }
  }).catch(err =>{
    ctx.body = {
    errno:10015,
    message:'缴费信息修改失败',err
}
})
}
//删除缴费信息
const deletePay = async ctx =>{
  const{_id} = ctx.request.body
  await Pay.remove({_id}).then(rel =>{
    if(rel.deletedCount === 1){
      ctx.body ={
        errno:0,
        message:"删除缴费信息成功"
      }
    }else{
      ctx.body ={
        errno:10011,
        message:"删除缴费信息失败"
      }
    }
  }).catch(err =>{
    ctx.body ={
      errno:10011,
      message:"删除缴费信息失败",err
    }
  })
}






module.exports ={
  addPay,
  checkPay,
  checknoPay,
  checkUserNoCheck,
  checkAllPay,
  updatePay,
  deletePay
}