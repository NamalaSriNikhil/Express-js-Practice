

const whitelist = [
    "https://www.w3schools.com",
    "https://www.geeksforgeeks.org"
]

const corsoptions = {
    origin:(origin,callback)=>{
        if (whitelist.indexOf(origin)!==-1 | !origin){
            callback(null,true)
        }else {
            callback(new Error('Not Allowed by Cors'))
        }
    },
    optionsucessstatus : 200
}

module.exports = corsoptions