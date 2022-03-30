const router = require('koa-router')()

const {addRetroaction,checkRetroaction,checkAllRetroaction,updateRetroaction,deleteRetroaction} = require('../controller/Retroaction')

router.prefix('/api')

//发布反馈信息
router.post('/add/retroaction',addRetroaction)
//查询反馈信息
router.post('/check/retroaction',checkRetroaction)
//查询所有反馈信息
router.post('/check/allretroaction',checkAllRetroaction)
//修改反馈信息
router.post('/update/retroaction',updateRetroaction)
// 删除反馈信息
router.post('/delete/retroaction',deleteRetroaction)


module.exports = router