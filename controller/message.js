let Message = require('../models/Message')

//新增消息
const addMessage = async ctx =>{
  console.log(ctx);
  let{headline,content,tel,name,site} = ctx.request.body
  await Message.create({headline,content,tel,name,site})
    .then(rel =>{
      ctx.body = {
        errno : 0,
        messages:'消息发布成功',
        data:rel
      }
    }).catch(err =>{
      ctx.body = {
        errno : 10002,
        messages:'消息发布失败',err
      }
    })
}

//查询单个用户消息信息
const checkMessage = async ctx =>{
  console.log(ctx);
  let{tel} = ctx.request.body
  await Message.find({tel}).then(rel =>{
    if(rel !==0){
      ctx.body ={
        errno:0,
        messages:'查询消息成功',
        data:rel
      }
    }else{
      ctx.body ={
        errno : 10008,
        messages:'查询消息失败'
      }
    }
  }).catch(err =>{
    ctx.body ={
      errno : 10008,
      messages:'查询消息失败',err
    }
  })
}

//查询所有消息
const checkAllMessage = async ctx =>{
  await Message.find().sort({_id:-1}).then(rel =>{
    if(rel){
      ctx.body = {
        errno:0,
        messages:'查询所有消息成功',
        data:rel
      }
    }else{
      ctx.body = {
        errno:-10010,
        messages:'查询所有消息失败',
    }
  }
  }).catch(err =>{
    ctx.body = {
      errno:-10010,
      messages:'查询所有消息失败',err
  }
  })
}

//修改消息信息
const updateMessage = async ctx =>{
  const message = ctx.request.body
  await Message.updateOne(
    {_id: message._id},
    {
      content:message.content,
      tel:message.tel,
      headline:message.headline
    }
  ).then(rel =>{
    if(rel.matchedCount > 0){
      ctx.body = {
        errno:0,
        messages:'消息修改成功',       
      }
    }else{
      ctx.body = {
        errno:10015,
        messages:'消息修改失败'
    }
    }
  }).catch(err =>{
    ctx.body = {
    errno:10015,
    messages:'消息资料修改失败',err
}
})
}
//删除消息
const deleteMessage = async ctx =>{
  const{_id} = ctx.request.body
  await Message.remove({_id}).then(rel =>{
    if(rel.deletedCount === 1){
      ctx.body ={
        errno:0,
        messages:"删除消息成功"
      }
    }else{
      ctx.body ={
        errno:10011,
        messages:"删除消息失败"
      }
    }
  }).catch(err =>{
    ctx.body ={
      errno:10011,
      messages:"删除消息失败",err
    }
  })
}

module.exports  ={
  addMessage,
  checkMessage,
  checkAllMessage,
  updateMessage,
  deleteMessage
}