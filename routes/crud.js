// create routes for crud api here
const express = require('express')
const router = express.Router()
const usermodel = require('../model/user')

var users = usermodel.find({})

//to display all the users
router.get('/display',(req,res)=>{
    users.exec((err,data)=>{
        if(err) throw err;
        res.render('index',{title :'crud api',records:data})
    })
	
})

// to fetch all the users
router.get('/fetchall',(req,res)=>{
usermodel.find()
.then(data =>{
	res.json({data})
})
.catch(err => {
	res.status(400).send(err)
})

})

//add user
router.post('/create',(req,res)=>{
const newUser = req.body.name;
const newpwd = req.body.password;
 
 const newuser = new usermodel({name:newUser,password:newpwd})
 newuser.save()
 .then(data =>{
    res.json({data})
})
.catch(err => {
    res.status(400).send(err)
})

    
    
})


//delete user

router.delete('/delete/:id', (req, res) => {
    usermodel.findOne({ _id: req.params.id })
        .then(data => {
            data.remove()
            res.json(data)
        })
        .catch(err => {
            console.log(err)
        })
})

//fetch user by id

router.get('/read/:id', (req, res) => {
    usermodel.findOne({ _id: req.params.id })
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            console.log(err)
        })
})

//update user by id 

router.put('/update/:id', (req, res) => {

    const Id = req.params.id;
    var name = { $set: { name: req.body.name } };
    

    usermodel.findByIdAndUpdate({ _id: Id }, name)
        .then(data => {
            res.json(data)
        }).catch(err => { console.log(err) })
})


module.exports = router
