 var mongoose = require('mongoose');
 var Student = mongoose.model('Student');

 var sendJsonResponse = function (res, status, content) {
     res.status(status);
     res.json(content);
 };
 
 module.exports.showAll = function (req, res) {
    Student
       .find()
       .exec(function(err, students){
           sendJsonResponse(res, 200, students);
       })
  };
 module.exports.showOne = function (req, res) {
    if (req.params && req.params.stuid) {
        Student
        .findById(req.params.stuid)
        .exec(function(err, student){
            if (!student){
            sendJsonResponse(res, 404, {
                "message": "student id not found"
            });
            return;
        } else if (err) {
            sendJsonResponse(res, 404, err);
            return;
        }
        sendJsonResponse (res, 200, student);
        });
    } else {
        sendJsonResponse(res, 404, {
        "message": "No student id in request"
        });
    }
      
  };
 module.exports.studentCreate = function (req, res) {
    Student.create({
        title: req.body.title,
        fname: req.body.fname,
        mname: req.body.mname,
        lname: req.body.lname,
        gender: req.body.gender,
        dob: req.body.dob,
        admission_date: req.body.admission_date,
        class: req.body.class,
    }, function(err, student){
        if(err){
            sendJsonResponse(res, 400, err);
        } else{
            sendJsonResponse(res, 201, student);
        }
    });
  };
 
 module.exports.studentUpdate = function (req, res) {
     if(!req.params.stuid) {
         sendJsonResponse(res, 404, {"message":"Student id is required"});
         return;
     }
     Student
       .findById(req.params.stuid)
       .exec (
           function(err, student){
               if (!student) {
                   sendJsonResponse (res, 404, {"message":"student id not found"});
                   return;
               } else if (err) {
                   sendJsonResponse (res, 400, err);
                   return;
               }
               student.title = req.body.title;
               student.fname = req.body.fname;
               student.mname = req.body.mname;
               student.lname = req.body.lname;
               student.gender = req.body.gender;
               student.dob = req.body.dob;
               student.admission_date = req.body.admission_date;
               student.class = req.body.class;
               student.save(function(err, student){
                   if (err) {
                       sendJsonResponse(res, 404, err);
                   } else {
                       sendJsonResponse (res, 200, student);
                   }
               });
           }
       );
  };
 module.exports.studentDelete = function (req, res) {
     var stuid = req.params.stuid;
     if (stuid) {
         Student
           .findByIdAndRemove (stuid)
           .exec(
               function (err, student){
                    if (err) {
                        sendJsonResponse(res, 404, err);
                        return;
                    }
                    sendJsonResponse(res, 204, null);
           });
     } else {
         sendJsonResponse (res, 404, {
             "message": "No student id"
         });
     }
  };
 
