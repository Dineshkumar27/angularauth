const express=require('express')
const router=express.Router()
const User=require('../models/user')
const mongoose=require('mongoose');
const user = require('../models/user');
const jwt=require('jsonwebtoken')

mongoose.connect(
    `mongodb+srv://trainingdineshkumars:dinesh1342@cluster0.1cwnw4s.mongodb.net/eventsdb?retryWrites=true&w=majority`, 
   
  );
function verifyToken(req,res,next){
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized request')
    }
    let token=req.headers.authorization.split(' ')[1]
    if(token==='null'){
        return res.status(401).send('Unauthorized request')
    }
    let payload=jwt.verify(token,'secretKey')
    if(!payload){
        return res.status(401).send('Unauthorized request')
    }
    req.userId=payload.subject
    next()
    console.log("done");
}
router.get('/',(req,res)=>{
    res.send("from API route")
})

router.post('/register',(req,res)=>{
    let userData=req.body
    let user=new User(userData)
    user.save()
    let payload={subject:user._id}
    let token=jwt.sign(payload,'secretKey')
    // res.send(user)
    res.status(200).send({token})
})

router.post('/login',(req,res)=>{
    let userData=req.body
   user.findOne({'email':userData.email}).then((data)=>{
    if(!data){res.status(401).send("invalid user")}
    else if(data.password!=userData.password){res.status(401).send("Invalid password")}
    else{
        let payload={subject:user._id}
        let token=jwt.sign(payload,'secretKey')
        // res.send(user)
        res.status(200).send({token})}
   }).catch((err)=>{
   console.log(err);})
})

router.get('/events',(req,res)=>{
    let events=[
        {
            "name": "Dinesh",
            "job": "Leader",
            "id": "199",
            "createdAt": "2020-02-20T11:00:28.107Z"
        },{
        "name": "Raj",
        "job": "Leader",
        "id": "199",
        "createdAt": "2020-02-20T11:00:28.107Z"
    },{
        "name": "Kumaran",
        "job": "Leader",
        "id": "199",
        "createdAt": "2020-02-20T11:00:28.107Z"
    }]
    res.send(events)
})

router.get('/special',verifyToken,(req,res)=>{
    let special=[
        {
            "name": "Dinesh",
            "job": "Leader",
            "id": "199",
            "createdAt": "2020-02-20T11:00:28.107Z"
        },{
        "name": "Raj",
        "job": "Leader",
        "id": "199",
        "createdAt": "2020-02-20T11:00:28.107Z"
    },{
        "name": "Kumaran",
        "job": "Leader",
        "id": "199",
        "createdAt": "2020-02-20T11:00:28.107Z"
    }]
    res.send(special)
})
module.exports=router