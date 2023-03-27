const express = require("express")
const {connection} = require("./db")
const {userRouter} = require("./routes/user.routes")
const {UserModel} = require("./model/user.model")
const {PostModel} = require("./model/post.model")
const {postRouter} = require("./routes/post.routes")
const {auth} = require("./middleware/auth.middleware")

require("dotenv").config()
const app = express()
const cors = ("cors")

app.use(express.json())
app.use(cors())

app.use("/users", userRouter)

app.use(auth)
app.use("/posts", postRouter)

app.listen(process.env.port, async()=>{
    try {
        await connection

        console.log("Connected to MongoDB server")
    } catch (err) {
        console.log("Server not connected")
        console.log(err)
    }
    console.log("Server is running on PORT")
})