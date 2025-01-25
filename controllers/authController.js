const userDB = {
    users : require('../model/user.json'),
    setUsers : function(data) { this.users=data }
}

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const fsPrmoises = require('fs').promises
const path = require('path')


const handleLogin = async (req,res) => {
    const {user,pwd} = req.body
    if (!user || !pwd) return res.status(401).json({"message": "Both username and pawwsord are required"})
    const founduser = userDB.users.find(person=>person.username===user)
    if (!founduser) return res.status(401).json({"message" : `${user} does not exist in DB`})
    console.log(founduser)
    const match = await bcrypt.compare(pwd,founduser.password)
    if (match){
        const roles= Object.values(founduser.roles)
        const accesstoken = jwt.sign(
        {
                "Userinfo" : {
                "username" : founduser.username,
                "roles" : roles
            }
        },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '30s'}
        )
        const refreshtoken = jwt.sign(
            {"username" : founduser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        )
        const otherusers = userDB.users.filter(person=>person.id!==founduser.username)
        const currentuser= {...founduser,refreshtoken}
        userDB.setUsers([...otherusers,currentuser])
        await fsPrmoises.writeFile(
            path.join(__dirname,'..','model','user.json'),
            JSON.stringify(userDB.users)
        )
        res.cookie('jwt',refreshtoken,{httpOnly:true,maxAge: 24*60*60*1000})
        res.json({accesstoken})
        // res.sendStatus(200)
    } else {
        res.status(401).json({"message": `${pwd} is wrong pls enter correct password`})
    }
}

module.exports = {
    handleLogin
}