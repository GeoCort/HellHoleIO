const expressAsyncHandler = require("express-async-handler");
require("dotenv").config()
const {PrismaClient} = require("prisma/prisma-client")
const multer = require("multer");
const express = require("express");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
const upload = multer({ storage: storage })
const cloudinary = require("cloudinary").v2
async function uploadFileToCloud(req){
    // Configuration
    cloudinary.config({ 
        cloud_name: 'djjoguprk', 
        api_key: process.env.APIKEY, 
        api_secret: process.env.SECRET_API_KEY // Click 'View API Keys' above to copy your API secret
    });
    
    // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
           req.file.path
       )
       .catch((error) => {
           console.log(error);
       });
            return uploadResult.url
    }
exports.uploadFile = expressAsyncHandler(async (req,res,next)=>{
   try{
    let format = "FILE"
    var prisma = new PrismaClient()
    const fileURl = await uploadFileToCloud(req)
    let files = await prisma.file.create({data:{
        name:req.file.originalname,
        url:fileURl,
        ownedByid:req.user.id,
        Bucketid:req.user.userbucketid,
        format:format
    },
        include:{
            ownedBy:true,
            Bucket:true,
            Folder:true
        }
    })
    res.redirect(`/user/${req.user.id}`)
   }catch(e){
    console.log(e)
    res.redirect(`/user/${req.user.id}`)
   }
})
exports.deleteFile = expressAsyncHandler(async (req,res)=>{
    try{
        var prisma = new PrismaClient()
        // Dynamically add fileID to each element in the users bucket or folders when displayed. 
        var id = req.params.id
        await prisma.file.delete({where:{
            id:parseInt(id)
        }})
        res.redirect(`/user/${req.user.id}`)
    }catch(e){
        console.log(e)
        console.log("You fucked up in the delete route for a file")
    }
})