const router = require('koa-router')()
const {addPic,checkallPic,deletePic} = require('../controller/advertising')
router.prefix('/api')

//上传图片地址
router.post('/add/pic',addPic)
// 查找所有图片地址
router.post('/check/allpic',checkallPic)
// 删除图片地址
router.post('/delete/pic',deletePic)
module.exports = router