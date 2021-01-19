const mongoose=require('mongoose')

const classSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    class:{
        type:String,
        required:true,
        trim:true
    },
    subject:[
        {
            type: String
        }
    ]
})


const Class=mongoose.model('Class', classSchema);

module.exports=Class