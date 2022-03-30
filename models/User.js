const mongoose = require('../db/db')
const Schema = mongoose.Schema({
  tel:{
    type:Number,
    require: true, //必须
    unique:true   //唯一 不可重复
  },
  password:{
    type:String,
    default:'123456'
  },
  name:String,
  sex:{
    type:String,
    default:"保密"
  },
  site:String,
  area:{
    type:Number,
    default:80
  },
  park:{
    type:Boolean,
    default:false
  },
  carnumber:{
    type:String,
    default:''
  },
  carsite:{
    type:String,
    default:'无'
  },
  avatar:{
    type:String,
    default:''
  }
}
,{timestamps:true})

const User = mongoose.model('user',Schema)

module.exports = User