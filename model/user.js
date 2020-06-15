//create mongodb schema here
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	name:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true
	}
})

const model = mongoose.model('model',userSchema)
module.exports = model