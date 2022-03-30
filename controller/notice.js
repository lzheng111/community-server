let Notice = require('../models/Notice')

//新增公告
const addNotice = async ctx =>{
  let{headline,content,pic} = ctx.request.body
  await Notice.create({headline,content,pic})
    .then(rel =>{
      ctx.body = {
        errno : 0,
        message:'公告发布成功',
        data:rel
      }
    }).catch(err =>{
      ctx.body = {
        errno : 10002,
        message:'公告发布失败',err
      }
    })
}

//查询单个公告信息
const checkNotice = async ctx =>{
  let{_id} = ctx.request.body
  await Notice.find({_id}).then(rel =>{
    if(rel !==0){
      ctx.body ={
        errno:0,
        message:'查询公告成功',
        data:rel
      }
    }else{
      ctx.body ={
        errno : 10008,
        message:'查询公告失败'
      }
    }
  }).catch(err =>{
    ctx.body ={
      errno : 10008,
      message:'查询公告失败',err
    }
  })
}

//查询所有公告
const checkAllNotice = async ctx =>{
  await Notice.find().sort({_id:-1}).then(rel =>{
    if(rel){
      ctx.body = {
        errno:0,
        message:'查询所有公告成功',
        data:rel
      }
    }else{
      ctx.body = {
        errno:-10010,
        message:'查询所有公告失败',
    }
  }
  }).catch(err =>{
    ctx.body = {
      errno:-10010,
      message:'查询所有公告失败',err
  }
  })
}

//修改公告信息
const updateNotice = async ctx =>{
  const notice = ctx.request.body
  await Notice.updateOne(
    {_id: notice._id},
    {
      headline:notice.headline,
      content:notice.content,
      pic: notice.pic,
    }
  ).then(rel =>{
    if(rel.matchedCount > 0){
      ctx.body = {
        errno:0,
        message:'公告修改成功',       
      }
    }else{
      ctx.body = {
        errno:10015,
        message:'公告修改失败'
    }
    }
  }).catch(err =>{
    ctx.body = {
    errno:10015,
    message:'公告资料修改失败',err
}
})
}
//删除公告
const deleteNotice = async ctx =>{
  const{_id} = ctx.request.body
  await Notice.remove({_id}).then(rel =>{
    if(rel.deletedCount === 1){
      ctx.body ={
        errno:0,
        message:"删除公告成功"
      }
    }else{
      ctx.body ={
        errno:10011,
        message:"删除公告失败"
      }
    }
  }).catch(err =>{
    ctx.body ={
      errno:10011,
      message:"删除公告失败",err
    }
  })
}

module.exports  ={
  addNotice,
  checkNotice,
  checkAllNotice,
  updateNotice,
  deleteNotice
}