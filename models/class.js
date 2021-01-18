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
            type: mongoose.Schema.Types.ObjectID,
            ref: "Subject"
        }
    ]
})


const Class=mongoose.model('Class', classSchema);

module.exports=Class