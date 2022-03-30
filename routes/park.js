const router = require('koa-router')()
const {addPark,checkPark,checkAllPark,updatePark,deletePark} = require('../controller/Park')

router.prefix('/api')

//增加停车信息
router.post('/add/park',addPark)
//查询停车信息
router.post('/check/park',checkPark)
//查询所有停车信息
router.post('/check/allpark',checkAllPark)
//修改停车信息信息
router.post('/update/park',updatePark)
// 删除停车信息
router.post('/delete/park',deletePark)




module.exports = router