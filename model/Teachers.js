const mongoose=require('mongoose')

const teacherSchema= mongoose.Schema({
    fName:{
        type:String,
        required:true
    },
    lName:{
        type:String,
        required:true
    },
    user:{
        type:String,
        required:true
    },
    pass:{
        type:String,
        required:true
    }
})

const Teachers=mongoose.model('Teachers',teacherSchema)

module.exports=Teachers;