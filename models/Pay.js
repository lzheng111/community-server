const mongoose = require('../db/db')

const Schema = mongoose.Schema({
  content:String,
  tel:{
    type:String,
    require: true,
  },
  name:String,
  site:{
    type:String,
    require: true,
  },
  area:Number,
  money:{
    type:Number,
    require: true,
  },
  state:{
    type:String,
    default:'待缴费'
  },
  toggle:{
    type:Boolean,
    default: false
  }
 
},{timestamps:true})

const Pay = mongoose.model('pay',Schema)

module.exports = Pay