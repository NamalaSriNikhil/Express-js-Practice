const express = require('express')
const router = express.Router()
const authcontroller = require('../../controllers/authController')

router.post('/',authcontroller.handleLogin)

module.exports =  router
