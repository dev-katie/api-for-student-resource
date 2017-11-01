var express = require('express');
var router = express.Router();
var ctrlStudent = require('../controllers/studentsController');

//organisations
router.get('/student', ctrlStudent.showAll);
router.get('/student/:stuid', ctrlStudent.showOne);
router.post('/student', ctrlStudent.studentCreate);
router.put('/student/:stuid', ctrlStudent.studentUpdate);
router.delete('/student/:stuid', ctrlStudent.studentDelete);


module.exports = router;