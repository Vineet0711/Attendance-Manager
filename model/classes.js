const mongoose =require('mongoose')

const classSchema=mongoose.Schema({
    user:{
        type:String,
        required:true
    },
    className:{
        type:String,
        required:true
    },
    Total:{
        type:Number,
        default:0
    },
    dateCreated:{
        type:Date,
        default:Date.now()
    }
})

const classes=mongoose.model('classes',classSchema)

module.exports=classes