const mongoose = require('../db/db')

const Schema = mongoose.Schema({
  tel:{
    type:String,
    require: true,
  },
  name:{
    type:String,
    require: true,
  },
  site:String,
  type:{
    type:String,
    default:''
  },
  state:{
    type:Boolean,
    default:false
  },
  comment:{
    type:String,
    default:'无'
  },
  toggle:{
    type:Boolean,
    default: false
  }
 
},{timestamps:true})

const Repairs = mongoose.model('repair',Schema)

module.exports = Repairs