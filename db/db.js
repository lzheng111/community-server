//连接数据库
const mongoose = require('mongoose')

const url = 'mongodb://localhost:27017' //本地默认mongodb地址
const dbName = 'communitydb' //数据库名称


// 开始连接
mongoose.connect(`${url}/${dbName}`,{
  useNewUrlParser:true,
  useUnifiedTopology:true
})

//连接对象
const db = mongoose.connection

db.on('error',err =>{
  console.error('mongoose connert error',err)
})



module.exports = mongoose