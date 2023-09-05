const express=require('express')
const router=express.Router()
const userController=require('../controllers/userController')

router.route('/register').post(userController.registerUser)
router.route('/user/:id').get(userController.getUserById)

module.exports=router