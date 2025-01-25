function verifyroles(...allowedvalues) {
    return (req,res,next)=>{
        if(!req?.roles) return req.sendStatus(403)
        const allowed=[...allowedvalues]
        console.log(allowed)
        console.log(req.roles)
        const found = req.roles.map(rol=>allowed.includes(rol)).find(val=>val===true)
        if(!found) return res.sendStatus(403)
        next()
    }
}

module.exports = verifyroles