const router = require('koa-router')()
const {addNotice,checkNotice,checkAllNotice,updateNotice,deleteNotice} = require('../controller/notice')

router.prefix('/api')

//发布公告
router.post('/add/notice',addNotice)
//查询公告
router.post('/check/notice',checkNotice)
//查询所有公告
router.post('/check/allnotice',checkAllNotice)
//修改公告信息
router.post('/update/notice',updateNotice)
// 删除公告
router.post('/delete/notice',deleteNotice)

module.exports = router