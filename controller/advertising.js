let Advertising = require('../models/Advertising')
// 上传图片
const addPic = async ctx =>{
  let{url} = ctx.request.body
  await Advertising.create({url})
    .then(rel =>{
      ctx.body = {
        errno : 0,
        message:'图片上传成功',
        data:rel
      }
    }).catch(err =>{
      ctx.body = {
        errno : 10002,
        message:'图片上传失败',err
      }
    })
}
// 查找所有图片
const checkallPic = async ctx =>{
  await Advertising.find().sort({_id:-1})
    .then(rel =>{
      ctx.body = {
        errno : 0,
        message:'查询全部图片成功',
        data:rel
      }
    }).catch(err =>{
      ctx.body = {
        errno : 10002,
        message:'查询全部图片失败',err
      }
    })
}

//删除图片
const deletePic = async ctx =>{
  const{_id} = ctx.request.body
  await Advertising.remove({_id}).then(rel =>{
    if(rel.deletedCount === 1){
      ctx.body ={
        errno:0,
        message:"删除图片成功"
      }
    }else{
      ctx.body ={
        errno:10011,
        message:"删除图片失败"
      }
    }
  }).catch(err =>{
    ctx.body ={
      errno:10011,
      message:"删除图片失败",err
    }
  })
}

module.exports ={
  addPic,
  checkallPic,
  deletePic
}