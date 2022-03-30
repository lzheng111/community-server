const router = require('koa-router')()

const {addRepairs,checkRepairs,checkNoRepairs,checkAllRepairs,updateRepairs,deleteRepairs} = require('../controller/Repairs')

router.prefix('/api')

//发布维修信息
router.post('/add/repairs',addRepairs)
//查询单个住户维修信息
router.post('/check/repairs',checkRepairs)
//查询待维修的订单信息
router.post('/check/norepairs',checkNoRepairs)
//查询所有维修
router.post('/check/allrepairs',checkAllRepairs)
//修改维修信息
router.post('/update/repairs',updateRepairs)
// 删除维修信息
router.post('/delete/repairs',deleteRepairs)


module.exports = router