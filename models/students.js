var mongoose = require('mongoose');

var studentSchema = new mongoose.Schema({
    title: {type: String},
    fname: {type: String, required: true},
    mname: {type: String},
    lname: {type: String, required: true},
    gender: {type: String},
    dob: {type: Date},
    admission_date: {type: Date, required:true},
    class: {type:String}
});

mongoose.model('Student', studentSchema);