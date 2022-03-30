let Park = require('../models/Park')

//新增用户停车位信息
const addPark = async ctx =>{
  let{tel,name,park,carnumber,carsite} = ctx.request.body
  await Park.create({tel,name,park,carnumber,carsite})
    .then(rel =>{
      ctx.body = {
        errno : 0,
        message:'停车位信息增加成功',
        data:rel
      }
    }).catch(err =>{
      ctx.body = {
        errno : 10002,
        message:'停车位信息增加失败',err
      }
    })
}

//查询单个停车信息
const checkPark = async ctx =>{
  let{tel} = ctx.request.body
  await Park.find({tel}).then(rel =>{
    if(rel !==0){
      ctx.body ={
        errno:0,
        message:'停车信息查询成功',
        data:rel
      }
    }else{
      ctx.body ={
        errno : 10008,
        message:'停车信息查询失败'
      }
    }
  }).catch(err =>{
    ctx.body ={
      errno : 10008,
      message:'停车信息查询失败',err
    }
  })
}

//查询所有停车信息
const checkAllPark = async ctx =>{
  await Park.find().sort({_id:-1}).then(rel =>{
    if(rel){
      ctx.body = {
        errno:0,
        message:'查询所有停车信息成功',
        data:rel
      }
    }else{
      ctx.body = {
        errno:-10010,
        message:'查询所有停车信息失败',
    }
  }
  }).catch(err =>{
    ctx.body = {
      errno:-10010,
      message:'查询所有停车信息失败',err
  }
  })
}

//修改停车信息
const updatePark = async ctx =>{
  const park = ctx.request.body
  await Park.updateOne(
    {_id:park._id},
    {
      tel:park.tel,
      name:park.name,
      park:park.park,
      carnumber:park.carnumber,
      carsite:park.carsite
    }
  ).then(rel =>{
    if(rel.matchedCount > 0){
      ctx.body = {
        errno:0,
        message:'停车信息修改成功',       
      }
    }else{
      ctx.body = {
        errno:10015,
        message:'停车信息修改失败'
    }
    }
  }).catch(err =>{
    ctx.body = {
    errno:10015,
    message:'停车信息修改失败',err
}
})
}
//删除停车信息
const deletePark = async ctx =>{
  const{_id} = ctx.request.body
  await Park.remove({_id}).then(rel =>{
    if(rel.deletedCount === 1){
      ctx.body ={
        errno:0,
        message:"删除停车信息成功"
      }
    }else{
      ctx.body ={
        errno:10011,
        message:"删除停车信息失败"
      }
    }
  }).catch(err =>{
    ctx.body ={
      errno:10011,
      message:"删除停车信息失败",err
    }
  })
}


module.exports ={
  addPark,
  checkPark,
  checkAllPark,
  updatePark,
  deletePark
}