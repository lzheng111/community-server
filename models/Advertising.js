const mongoose = require('../db/db')

const Schema = mongoose.Schema({
  url:{
    type:String,
    default:''
  }
 
},{timestamps:true})

const Advertising = mongoose.model('advertising',Schema)

module.exports = Advertising