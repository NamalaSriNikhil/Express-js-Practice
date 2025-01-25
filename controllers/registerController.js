const userDB = {
    users : require('../model/user.json'),
    setUsers : function(data) {this.users=data}
}

const fsPrmoises = require('fs').promises
const path = require('path')
const bcrypt = require('bcrypt')


const handlenewuser = async (req,res) => {
    const  { user,pwd } = req.body
    if (!user || !pwd) return res.status(400).json({"message" : "Both username and password are required"})
    const duplicate = userDB.users.find(person=>person.username===user)
    // check duplicates
    if (duplicate) return res.status(409).json({"message": `${user} name is already taken`})
    try {
// Hash the password for protection
        const hashedpwd = await bcrypt.hash(pwd,10)
        const newuser = {
            "username" : user,
            "roles" : {"user" : 2002},
            "password" : hashedpwd
        }
        userDB.setUsers([...userDB.users,newuser])
        await fsPrmoises.writeFile(
            path.join(__dirname,'..','model','user.json'),
            JSON.stringify(userDB.users)
        )
        console.log(userDB.users)
        res.status(200).json({"message": `${user} is succesfully created`})
    }catch (err) {
        res.status(500).json({"message":err.message})
    }
    
}

module.exports = {
    handlenewuser
}