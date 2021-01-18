const mongoose=require('mongoose')

const pdfSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    link:{
        type:String,
        required:true,
        trim:true
    },
    class:{
        type:String,
        required:true,
        trim:true
    },
    subject:{
        type:String,
        required:true,
        trim:true
    },
    topic:{
        type:String,
        required:true,
        trim:true
    }
})


const Pdf=mongoose.model('Pdf', pdfSchema);

module.exports=Pdf