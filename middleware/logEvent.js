const { format } = require('date-fns')
const { v4:uuid } = require('uuid')

const fs=require('fs')
const fsPromises = require('fs').promises
const path=require('path')

const logEvents = async (message,logname) =>{
    const dateItem = `${format(new Date(),'yyyyMMdd\tHH:mm:ss')}`
    const logItem=`${dateItem}\t${uuid()}\t${message}\n`
    console.log(logItem)
    try{
        if(!fs.existsSync(path.join(__dirname,'..','log'))){
           await fsPromises.mkdir(path.join(__dirname,'..','log'))
        }
        await fsPromises.appendFile(path.join(__dirname,'..','log',logname),logItem)
    }catch(err){
        console.log(err)
    }
}

const logger = (req,res,next)=>{
    logEvents(`${req.method}\t${req.path}\t\t${req.headers.origin}\t${req.url}`,"nikhil.txt")
    console.log(`${req.url}`)
    next()
}

module.exports={logEvents,logger}