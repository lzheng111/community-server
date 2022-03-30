const router = require('koa-router')()

const {addPay,checkPay,checkAllPay,updatePay,deletePay,checknoPay,checkUserNoCheck} = require('../controller/Pay')

router.prefix('/api')

//发布缴费信息
router.post('/add/pay',addPay)
//查询单用户缴费信息
router.post('/check/pay',checkPay)
//查询全部用户待缴费订单信息
router.post('/check/nopay',checknoPay)
//查询单个用户待缴费订单
router.post('/check/user/nopay',checkUserNoCheck)
//查询所有缴费信息
router.post('/check/allpay',checkAllPay)
//修改缴费信息
router.post('/update/pay',updatePay)
// 删除缴费信息
router.post('/delete/pay',deletePay)





module.exports = router