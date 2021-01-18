const mongoose=require('mongoose')

const topicSchema=new mongoose.Schema({
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
    pdf:[
        {
            type: mongoose.Schema.Types.ObjectID,
            ref: "Pdf"
        }
    ]
})


const Topic=mongoose.model('Topic', topicSchema);

module.exports=Topic