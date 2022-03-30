const mongoose = require('../db/db')

const Schema = mongoose.Schema({
  headline:{
    type:String,
    require: true, //必须
  },
  content:String,
  pic:{
    type:String,
    default:''
  }
 
},{timestamps:true})

const Notice = mongoose.model('notice',Schema)

module.exports = Notice