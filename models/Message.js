const mongoose = require('../db/db')

const Schema = mongoose.Schema({
  
  tel:{
    type:String,
    require: true, //必须
  },
  headline:{
    type:String,
    require: true, //必须
  },
  content:String,
  name:String,
  site:String

},{timestamps:true})

const Message = mongoose.model('message',Schema)

module.exports = Message