const express=require('express');
const router=new express.Router();
const Apis=require('../ApiFunctions/Apis')

router.post('/user/register',Apis.saveTeacher)
router.post('/user/login',Apis.Login);
router.get('/user/:id',Apis.userClasses);
router.post('/user/addclass',Apis.saveClass);
router.get('/class/students/:id',Apis.getStudents);
router.post('/save',Apis.saveAttendance);
router.post('/save/students',Apis.saveStudents)
module.exports = router;