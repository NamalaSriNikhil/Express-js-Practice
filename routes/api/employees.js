const express = require('express')
const router = express.Router()
const controller = require('../../controllers/employeesController')
const role= require('../../config/roles_array')
const verifyroles = require('../../middleware/verifyRoless')

router.route('/')
    .get(controller.getAllEmployees)
    .post(controller.createNewEmployee)
    .put(controller.updateEmployee)
    .delete(controller.deleteEmployee)
    
router.route('/:id')
    .get(controller.getEmployee)

module.exports = router