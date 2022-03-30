const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const cors = require('koa2-cors')

const index = require('./routes/index')
const users = require('./routes/users')
const upload = require('./routes/upload')
const notice = require('./routes/notice')
const advertising = require('./routes/advertising')
const park = require('./routes/park')
const pay = require('./routes/pay')
const repairs = require('./routes/repairs')
const retroaction = require('./routes/retroaction')
const message = require('./routes/message')


// error handler
onerror(app)

//cors配置 （跨域）
app.use(cors({
  // origin:'*',
  origin:'http://localhost:8080', //前端origin
  credentials:true  //允许跨域带cookie
  
}))

//session配置
app.keys = ['lzhyyds'] //秘钥，用于加密
app.use(session({
  //配置cookie
  cookie:{
    path:'/',
    httpOnly:true,   //只允许后端修改cookie
    maxAge:24*60*60*1000,
    resave:true },
  
}))

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(upload.routes(),upload.allowedMethods())
app.use(notice.routes(),notice.allowedMethods())
app.use(message.routes(),message.allowedMethods())
app.use(advertising.routes(),advertising.allowedMethods())
app.use(park.routes(),park.allowedMethods())
app.use(pay.routes(),pay.allowedMethods())
app.use(repairs.routes(),repairs.allowedMethods())
app.use(retroaction.routes(),retroaction.allowedMethods())





// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
