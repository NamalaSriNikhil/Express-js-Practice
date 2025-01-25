const userDB = {
    users : require('../model/user.json'),
    setUsers : function(data) { this.users=data }
}

const jwt = require('jsonwebtoken')
require('dotenv').config()

const handleRefreshToken =  (req,res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(401 )
    console.log(cookies.jwt)
    const refreshtoken = cookies.jwt
    const founduser = userDB.users.find(person=>person.refreshtoken===refreshtoken)
    if (!founduser) return res.sendStatus(403)
    console.log(founduser)
    jwt.verify(
        refreshtoken,
        process.env.REFRESH_TOKEN_SECRET,
        (err,decoded)=>{
            if (err || founduser.username!==decoded.username) return res.sendStatus(403)
            const roles = Object.values(founduser.roles)
            const accestoken = jwt.sign(
                {
                    "Userinfo" : {
                        "username" : founduser.username,
                        "roles" : roles
                }
            },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn : '30s'}
        )
        res.json({accestoken})
        }
    )
}

module.exports = {
    handleRefreshToken
}