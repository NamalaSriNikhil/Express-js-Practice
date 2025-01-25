const {logEvents} = require('../middleware/logEvent')

const errorhandler = function(err,req,res,next){
    logEvents(`${err.name}:${err.message}`,'errlog.txt')
    console.log(err.stack)
    res.status(500).send(err.message)
}

module.exports = errorhandler