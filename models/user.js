const mongoose= require('mongoose')

const spuserSchema= new mongoose.Schema({

fname:{type:String,
required:true},
lname:{
	type:String,
	required:true
},
email:{
	type:String,
	required:true,
	unique:true
},
password:{
	type:String,
	required:true
},
age:{
	type:Number,
	required:true
},
contacts:[{name:{type:String},number:{type:Number}}]
})

const spuserModel= mongoose.model('SpUser',spuserSchema);
 module.exports= spuserModel;
