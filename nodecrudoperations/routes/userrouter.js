const express=require('express')

const router=express.Router()

const usercontroller=require('../controllers/usercontroller')

const homecontroller=require('../controllers/homecontroller')

router.get('/',homecontroller.getuserpage)

module.exports=router;
