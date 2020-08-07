const express = require('express')

const User = require('../models/user.js')

const router = express.Router();

router.post('/signup',async (req,res)=>{


	try{



		console.log(req.body.values.email)
		console.log(req.body.values)
		const exist=await  User.findOne({email:req.body.values.email})

		if (exist){
			return res.status(400).send({msg:"Email Already exist"})
		}
		else{
			const user= new User({
				email:req.body.values.email,
				fname:req.body.values.fname,
				lname:req.body.values.lname,
				age:req.body.values.age,
				password:req.body.values.password
			})
			const newUser= await user.save()
			if (newUser)
			{

				return res.status(201).send({"msg":"User Created","status":201})
			}
		}

	}
	catch(err){
		console.log(err)
           return res.send({msg:err.msg})
	}
})


router.post('/login',async(req,res)=>{
	try{
		const loginUser = await User.findOne({email:req.body.values.email,
			password:req.body.values.password});
		
		if(loginUser)
		{
			console.log(loginUser)

res.send({
                 	_id:loginUser.id,
                 	fname:loginUser.fname,
                 	lname:loginUser.lname,
                 	email:loginUser.email,
                 	
                 })
		
                 
		}
		else{
			res.status(401).send({msg:'Invalid Email/Password'})
		}

	}
	catch(err){
		res.send({msg:err.msg})

	}
})

router.post('/addcontact/:id',async(req,res)=>{
try{
	const user= await User.findOne({_id:req.params.id})
	if (user)
	{
		user.contacts.push({name:req.body.name,number:req.body.number})
		user.contacts.sort()
		user.save()
		res.send({"status":201,"msg":"Contact added"})

	}
	else{
		res.send({"status":404,"msg":"Unauthorized"})
	}
}
catch(err){
	return res.send({"msg":err.msg})
}

})
router.get('/contact/:id',async(req,res)=>{
	try{
		const user= await User.findOne({_id:req.params.id})
		if (user)
		{
			return res.send({"status":200,"contacts":user.contacts})
		}
		else{
			res.send({"status":404,"msg":"Unauthorized"})
		}

	}
	catch(err){
		return res.send({"msg":err.msg})

	}
})


router.get('/delete/:id1/:id2',async(req,res)=>{
	console.log("e")
	console.log(req.params.id1,req.params.id2)
	try{
		const user= await User.findOne({_id:req.params.id1})
		if (user)
		{
			console.log(user)
			const updatecontact= await user.contacts.splice(req.params.id2,1)
			console.log(user.contacts)
			user.contacts.sort()
			await user.save()
			return res.send({"status":201,"contacts":user.contacts})
		}
		else{
			res.send({"status":404,"msg":"Unauthorized"})
		}

	}
	catch(err){
		return res.send({"msg":err.msg})

	}
})

router.put('/edit/:id1/:id2',async(req,res)=>{
	
	
	try{
		const user= await User.findOne({_id:req.params.id1})
		if (user)
		{

			console.log("r",req.body.name)

			  user.contacts[req.params.id2].name=req.body.name
			user.contacts[req.params.id2].number=req.body.number
			await user.contacts.sort()
			
			await user.save()
			return res.send({"status":201,"contacts":user.contacts})
		}
		else{
			res.send({"status":404,"msg":"Unauthorized"})
		}

	}
	catch(err){
		return res.send({"msg":err.msg})

	}
})

module.exports= router;