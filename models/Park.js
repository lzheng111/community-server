const mongoose = require('../db/db')

const Schema = mongoose.Schema({
  tel:{
    type:Number,
    require: true, //必须
  },
  name:String,
  park:{
    type:Boolean,
    default:false
  },
  carnumber:String,
  carsite:String
 
},{timestamps:true})

const Park = mongoose.model('park',Schema)

module.exports = Park