const router = require('koa-router')()
const {addMessage,checkMessage,checkAllMessage,updateMessage,deleteMessage} = require('../controller/message')

router.prefix('/api')

//发布公告
router.post('/add/message',addMessage)
//查询单个用户公告
router.post('/check/message',checkMessage)
//查询所有公告
router.post('/check/allmessage',checkAllMessage)
//修改公告信息
router.post('/update/message',updateMessage)
// 删除公告
router.post('/delete/message',deleteMessage)

module.exports = router