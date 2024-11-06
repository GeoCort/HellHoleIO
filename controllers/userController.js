const asyncHandler = require("express-async-handler")
var express = require('express');
var {PrismaClient} = require("prisma/prisma-client")
const multer= require("multer")
var { upload }= multer( {dest:"uploads/"} )
const test = require("../prisma/prisma")
var prisma;

exports.getUserPage =asyncHandler(async (req,res,next)=>{
    var bucket;
    try{
        prisma = new PrismaClient()
        let bucketID = parseInt(req.user.userbucketid)
            bucket = await prisma.bucket.findUnique({
            where:{
                id:req.user.userbucketid
            },include:{
                files:true,
                folders:true
            }
        })
        console.log(bucket)
        await prisma.$disconnect()
    }catch(e){
        console.log("failed to get bucket ",e)
    }
    res.render("user",{title:`${req.user.username}'s Homepage`, user:req.user, folders:[], bucket:bucket})
})
exports.deleteUser = asyncHandler(async (req,res,next)=>{
    // create db connection
    prisma = new PrismaClient()
    try{
        prisma.user.delete({data:{
            where:{
                id: req.user.id
            }
        }})
        await prisma.$disconnect()
    }catch(e){
        console.log("Failed to delete user ")
    }
})
// router.post("/upload", asyncHandler(async (req,res,next)=>{
//     try{
//         prisma = new PrismaClient()
//         prisma.file.create({data:{
//             name:req.filename,
//             url:"",
//             ownedByid:{
//                 connect:req.user.id
//             },
//             bucket:{
//                 connect:req.user.userbucketid
//             },
//             format:"file"
//         }})
//         prisma.$disconnect()
//         res.redirect("/user")
//     }catch(e){
//         console.log("error in /upload", e)
//     }
// }))