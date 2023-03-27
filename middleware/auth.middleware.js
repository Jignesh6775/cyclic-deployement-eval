const jwt = require("jsonwebtoken")

const auth = (req, res, next)=>{
    const token = req.headers.authorizarion

    if(token){
        const decoded = jwt.verify(token, "batman")

        if(decoded){
            req.body.userID = decoded.userID
            next()
        }else{
            res.status(404).send({"msg": "Please Login First..!!"})
        }
    } else{
        res.status(404).send({"msg": "Please Login First..!!"})
    }
}


module.exports =  {auth}