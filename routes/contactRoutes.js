const express=require('express');
const router=express.Router();
const {auth}=require('../middleware/authMiddleware')
const{getContact,setContact,updateContact,deleteContact}=require('../controllers/contactController')

router.route('/').get(auth,getContact).post(auth,setContact)
router.route('/:id').delete(auth,deleteContact).put(auth,updateContact);

module.exports=router;
