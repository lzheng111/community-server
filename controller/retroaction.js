let Retroaction = require('../models/Retroaction')

//新增反馈信息
const addRetroaction = async ctx =>{
  let{content,type,state,comment,tel,toggle} = ctx.request.body
  await Retroaction.create({content,type,state,comment,tel,toggle})
    .then(rel =>{
      ctx.body = {
        errno : 0,
        message:'反馈信息增加成功',
        data:rel
      }
    }).catch(err =>{
      ctx.body = {
        errno : 10002,
        message:'反馈信息增加失败',err
      }
    })
}

//查询单个反馈信息
const checkRetroaction = async ctx =>{
  let{tel} = ctx.request.body
  await Retroaction.find({tel}).then(rel =>{
    if(rel !==0){
      ctx.body ={
        errno:0,
        message:'反馈信息查询成功',
        data:rel
      }
    }else{
      ctx.body ={
        errno : 10008,
        message:'反馈信息查询失败'
      }
    }
  }).catch(err =>{
    ctx.body ={
      errno : 10008,
      message:'反馈信息查询失败',err
    }
  })
}

//查询所有反馈信息
const checkAllRetroaction = async ctx =>{
  await Retroaction.find().sort({_id:-1}).then(rel =>{
    if(rel){
      ctx.body = {
        errno:0,
        message:'查询所有反馈信息成功',
        data:rel
      }
    }else{
      ctx.body = {
        errno:-10010,
        message:'查询所有反馈信息失败',
    }
  }
  }).catch(err =>{
    ctx.body = {
      errno:-10010,
      message:'查询所有反馈信息失败',err
  }
  })
}

//修改反馈信息
const updateRetroaction = async ctx =>{
  const retroaction = ctx.request.body
  await Retroaction.updateOne(
    {_id: retroaction._id},
    {
      content:retroaction.content,
      type:retroaction.type,
      state:retroaction.state,
      comment:retroaction.comment,
      toggle:retroaction.toggle,
      tel:retroaction.tel
    }
  ).then(rel =>{
    if(rel.matchedCount > 0){
      ctx.body = {
        errno:0,
        message:'反馈信息修改成功',       
      }
    }else{
      ctx.body = {
        errno:10015,
        message:'反馈信息修改失败'
    }
    }
  }).catch(err =>{
    ctx.body = {
    errno:10015,
    message:'反馈信息修改失败',err
}
})
}
//删除反馈信息
const deleteRetroaction = async ctx =>{
  const{_id} = ctx.request.body
  await Retroaction.remove({_id}).then(rel =>{
    if(rel.deletedCount === 1){
      ctx.body ={
        errno:0,
        message:"删除反馈信息成功"
      }
    }else{
      ctx.body ={
        errno:10011,
        message:"删除反馈信息失败"
      }
    }
  }).catch(err =>{
    ctx.body ={
      errno:10011,
      message:"删除反馈信息失败",err
    }
  })
}


module.exports ={
  addRetroaction,
  checkRetroaction,
  checkAllRetroaction,
  updateRetroaction,
  deleteRetroaction
}