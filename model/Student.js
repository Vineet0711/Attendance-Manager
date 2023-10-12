const mongoose=require('mongoose');

const studentSchema=mongoose.Schema({
    classId:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    roll:{
        type:String,
        required:true
    },
    count:{
        type:Number,
        default:0
    }
})

const students=mongoose.model('students',studentSchema);

module.exports=students;