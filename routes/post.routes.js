const express = require("express")
const postRouter = express.Router()
const {PostModel} = require("../model/post.model")
const jwt = require('jsonwebtoken');
const key = "batman"


postRouter.post("/add", async(req,res)=>{
    try {
        const post = new PostModel(req.body)
        await post.save()
        res.status(200).send({"msg":"Post has been added"})
    } catch (err) {
        res.status(400).send({"msg":err.message})
    }
})

postRouter.get("/", async(req,res)=>{
    const token = req.header.authorization
    const decoded = jwt.verify(token, key)
    try {
        if(decoded){
            const post = await PostModel.find({"userID":decoded.userID})
            res.send(post)
        }
       
    } catch (err) {
        res.status(400).send({"msg":err.message})
    }
})

postRouter.patch("/update/:id", async(req,res)=>{
    const payload = req.body
    const id = req.params.id
    try {
        await PostModel.findByIdAndUpdate({_id:id},payload)
        res.status(200).send({"msg":"Post has been updated"})
    } catch (err) {
        res.status(400).send({"msg":err.message})
    }
})

postRouter.delete("/delete/:id", async(req,res)=>{
    const id = req.params.id
    try {
        await PostModel.findByIdAndDelete({_id:id})
        res.status(200).send({"msg":"Post has been deleted"})
    } catch (err) {
        res.status(400).send({"msg":err.message})
    }
})

postRouter.get("/top", async(req,res)=>{
    let {page, q, sort} = req.query
    let value = sort=="asc"?1:-1
    let limit =3
    let skip = (+page -1)*limit
    let data = await PostModel.find().sort({device:value}).skip(skip).limit(limit)
    res.status(200).send(data)
})