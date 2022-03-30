let Repairs = require('../models/Repairs')

//新增维修信息
const addRepairs = async ctx =>{
  let{tel,name,site,type,state,comment,toggle} = ctx.request.body
  await Repairs.create({tel,name,site,type,state,comment,toggle})
    .then(rel =>{
      ctx.body = {
        errno : 0,
        message:'维修信息增加成功',
        data:rel
      }
    }).catch(err =>{
      ctx.body = {
        errno : 10002,
        message:'维修信息增加失败',err
      }
    })
}

//查询单个住户维修信息
const checkRepairs = async ctx =>{
  let{tel} = ctx.request.body
  await Repairs.find({tel}).then(rel =>{
    if(rel !==0){
      ctx.body ={
        errno:0,
        message:'维修信息查询成功',
        data:rel
      }
    }else{
      ctx.body ={
        errno : 10008,
        message:'维修信息查询失败'
      }
    }
  }).catch(err =>{
    ctx.body ={
      errno : 10008,
      message:'维修信息查询失败',err
    }
  })
}
//查询待维修的订单信息
const checkNoRepairs= async ctx =>{
  await Repairs.find({state:false}).then(rel =>{
    if(rel){
      ctx.body ={
        errno:0,
        message:'查询成功',
        data:rel
      }
    }else{
      ctx.body = {
        errno:-10010,
        message:'查询待维修信息失败'
    }
    }
  }).catch(err =>{
    ctx.body = {
      errno:-10010,
      message:'查询待维修信息失败',err
  }
  })
}

//查询所有维修信息
const checkAllRepairs = async ctx =>{
  await Repairs.find().sort({_id:-1}).then(rel =>{
    if(rel){
      ctx.body = {
        errno:0,
        message:'查询所有维修信息成功',
        data:rel
      }
    }else{
      ctx.body = {
        errno:-10010,
        message:'查询所有维修信息失败',
    }
  }
  }).catch(err =>{
    ctx.body = {
      errno:-10010,
      message:'查询所有维修信息失败',err
  }
  })
}

//修改维修信息
const updateRepairs = async ctx =>{
  const repairs = ctx.request.body
  await Repairs.updateOne(
    {_id: repairs._id},
    {
      tel:repairs.tel,
      name:repairs.name,
      site: repairs.site,
      type:repairs.type,
      state:repairs.state,
      comment:repairs.comment,
      toggle:repairs.toggle
    }
  ).then(rel =>{
    if(rel.matchedCount > 0){
      ctx.body = {
        errno:0,
        message:'维修信息修改成功',       
      }
    }else{
      ctx.body = {
        errno:10015,
        message:'维修信息修改失败'
    }
    }
  }).catch(err =>{
    ctx.body = {
    errno:10015,
    message:'维修信息修改失败',err
}
})
}
//删除维修信息
const deleteRepairs = async ctx =>{
  const{_id} = ctx.request.body
  await Repairs.remove({_id}).then(rel =>{
    if(rel.deletedCount === 1){
      ctx.body ={
        errno:0,
        message:"删除维修信息成功"
      }
    }else{
      ctx.body ={
        errno:10011,
        message:"删除维修信息失败"
      }
    }
  }).catch(err =>{
    ctx.body ={
      errno:10011,
      message:"删除维修信息失败",err
    }
  })
}


module.exports ={
  addRepairs,
  checkRepairs,
  checkNoRepairs,
  checkAllRepairs,
  updateRepairs,
  deleteRepairs
}