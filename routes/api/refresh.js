const express = require('express')
const router = express.Router()
const refreshtokencontroller = require('../../controllers/refreshTokenController')

router.get('/',refreshtokencontroller.handleRefreshToken)

module.exports =  router
