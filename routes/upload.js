// 上传图片接口
const multer = require('koa-multer')
const fs = require('fs')
const path = require('path')
const router = require('koa-router')()


router.prefix('/upload')
let upload = multer({
  storage: multer.diskStorage({
  //设置文件存储位置
  destination:function(req,file,cb){
    let date = new Date()
    let year = date.getFullYear()
    let month = (date.getMonth() +1).toString().padStart(2, '0');
    let day = date.getDate()
    let dir = './public/uploads/' +year+month+day

    //判断文件是否存在
    if(!fs.existsSync(dir)){
      fs.mkdirSync(dir,{
        recursive:true
      })
    }
    cb(null,dir)
  },
  //设置文件存储名称
  filename:function(req,file,cb){
    let fileName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
    //fileName就是上传文件的文件名
    cb(null, fileName);
  }
})
})


//返回图片链接
router.post('/img', upload.single("myfile"), async ctx => {
  let path = ctx.req.file.path
  path = ctx.origin +''+ path.replace('public','')
  ctx.body = {
    data: path
}
})

module.exports = router