const express = require('express');
const router = express.Router();
const Class = require('../models/class');
const Pdf = require('../models/pdf');
const Subject = require('../models/subject');
const { route } = require('./user');


route.get('/class',async(req,res)=>{
    const clas=await Class.find()
    //add rendering route
})

route.get('/subject',async(req,res)=>{
    const sub=await Subject.find()
    //add rendering route
})

route.get('/class',async(req,res)=>{
    const pdf=await Pdf.find()
    //add rendering route
})

route.post('/class',async(req,res)=>{
    const clas=await Class(req.body)
    await clas.save()
    //add rendering route
})

route.post('/subject',async(req,res)=>{
    const sub=await Subject(req.body)
    await sub.save()
    //add rendering route
})

route.post('/pdf',async(req,res)=>{
    const pdf=await Pdf(req.body)
    await pdf.save()
    //add rendering route
})

module.exports=router