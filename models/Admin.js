const mongoose = require('../db/db')

const Schema = mongoose.Schema({
  tel:{
    type:Number,
    require: true, //必须
    unique:true   //唯一 不可重复
  },
  password:{
    type:String,
    default:123456
  },
  username:String,
  sex:{
    type:String,
    default:"保密"
  },
  level:{
    type:String,
    default:"管理员"
  }
  
},{timestamps:true})

const Admin = mongoose.model('admin',Schema)

module.exports = Admin