const express = require('express')
const router = express.Router()
const studentsController = require("../controllers/students-controller")


router.get('/', studentsController.getAll)
router.post('/', studentsController.create)

router.get('/:id', studentsController.getById)
router.put('/:id', studentsController.update)
router.delete('/:id', studentsController.delete)









module.exports = router