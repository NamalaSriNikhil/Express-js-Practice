const express=require('express')
const app=express()
const cors = require('cors')
const PORT = process.env.PORT || 3500;
const path=require('path')
const verifyJwt = require('./middleware/verifyJwt')
const   errorhandler   = require('./middleware/errorhandler')
const cookieParser = require('cookie-parser')
const corsoptions = require('./config/corsOption')

const { logger } = require('./middleware/logEvent')

app.use(express.json())

app.use(cookieParser())

app.use(logger)

app.use(cors(corsoptions))

app.use('/',express.static(path.join(__dirname,'/public')))
app.use('/subdir',express.static(path.join(__dirname,'/public')))

app.use('/subdir',require('./routes/subdir'))
app.use('/',require('./routes/root'))
app.use('/register',require('./routes/api/register'))
app.use('/auth',require('./routes/api/auth'))
app.use('/refresh',require('./routes/api/refresh'))
app.use(verifyJwt)
app.use('/employees',require('./routes/api/employees'))

app.all('*',(req,res)=>{
    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname,'views','404.html'))
    }else if(req.accepts('html')){
        res.json({error : "404 Not found"})
    } else {
        res.type('txt').send("404 Not found")
    }
    
})

app.use(errorhandler)

app.listen(PORT,()=>console.log(`server listening on ${PORT}\nserver live on http://localhost:${PORT}`))




// app.get('/chain(.html)?',(req,res,next)=>{
//     console.log("one")
//     next()
//     console.log("three")
// },(req,res)=>{
//     console.log("Two")
//     res.send("Domain Expansion")
// })


// const one =(req,res,next)=>{
//     console.log("Start")
//     next()
// }

// const two =(req,res,next)=>{
//     console.log("get set")
//     next()
// }

// const three =(req,res)=>{
//     console.log("go")
//     res.send("Go")
// }

// app.get('/game(.html)?',[one,two,three])