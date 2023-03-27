const express = require("express")
const userRouter = express.Router()
const {UserModel} = require("../model/user.model")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const key = "batman"


/// Registration
userRouter.post("/register", async (req,res)=>{
    const { name,email,gender,password,age,city,is_married } = req.body

    try {
        bcrypt.hash(password, 5, async (err, hash)=> {
            const user = new UserModel({name, email, gender, password:hash, age, city, is_married})
            await user.save()
            res.status(200).send({"msg": "User Successfully Register"})
        })
    } catch (err) {
        res.status(400).send({"msg": err.message})
    }
})

userRouter.post("/login", async (req,res)=>{
    const {email, password} = req.body
    try {
        const user = await UserModel.findOne({email})

       if(user){
        bcrypt.compare(password, user.password, (err, result)=> {
           if(result){
            res.status(200).send({"msg": "Login Successful", "token": jwt.sign({ "userID":user._id }, key)})
           } else{
            res.status(400).send({ "msg": "Wrong Credantials ..!" })
           }
        })
       }
    } catch (err) {
        res.status(400).send({ "msg": err.message })
    }
})

module.exports = {userRouter}