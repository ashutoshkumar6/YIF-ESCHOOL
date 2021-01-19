const mongoose=require('mongoose')

const subjectSchema=new mongoose.Schema({
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
    topic:[
        {
            type: String
        }
    ]
})


const Subject=mongoose.model('Subject', subjectSchema);

module.exports=Subject