const mongoose = require('../db/db')

const Schema = mongoose.Schema({
  content:String,
  type:{
    type:String,
    default:'建议'
  },
  state:{
    type:Boolean,
    default:false
  },
  comment:{
    type:String,
    default:''
  },
  tel:Number,
  toggle:{
    type:Boolean,
    default: false
  }
 
},{timestamps:true})

const Retroaction = mongoose.model('retroaction',Schema)

module.exports = Retroaction