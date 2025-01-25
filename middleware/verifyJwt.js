const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyJwt = (req,res,next) =>{
    const authheader = req.headers['authorization'];
    if (!authheader) return res.sendStatus(401);
    console.log(authheader)
    const token = authheader.split(" ")[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decoded) =>{
            if(err) return res.sendStatus(403);
            req.user= decoded.Userinfo.username;
            req.role=decoded.Userinfo.roles
            console.log(req.user);
            console.log(req.role)
            next()
        }
    )
}

module.exports = verifyJwt