const asyncHandler = require("express-async-handler")
var express = require('express');
var {PrismaClient, Prisma} = require("prisma/prisma-client")
const cloudinary = require("cloudinary").v2
const multer = require("multer")
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

exports.getFolderFiles = asyncHandler(async (req,res,next)=>{
    let params= req.params;
    const prisma = new PrismaClient()
  try{
    const folders = await prisma.folder.findUnique({
        where:{
            id:params.folderId | 1
        },               
         include:{files:true}
    })
        res.render("folders",{folder:folders, title:"All files", user:req.user})
        await prisma.$disconnect()
    }catch(e){
        console.log("failed to load files")
    }
})
exports.createFolder = asyncHandler(async (req,res,next)=>{
    try{
        const folderName =  req.body.folderName;
    const bucketId = req.user.userbucketid
    console.log(folderName, bucketId, "This is in Post requesst /folder")
    prisma = new PrismaClient()
    const folder = await prisma.folder.create({data:{
        name:folderName,
        parent:{
            connect:{id:bucketId}
        }
    },include:{
        parent:true,
        files:true
    }
    })
    console.log("The folder was created successfully")
    await prisma.$disconnect()
    res.redirect("/user")
    }catch(e){
        console.log(e)
        console.log("/folder, most likely db error")
    }
})
exports.deleteFolder = asyncHandler(async (req,res,next)=>{
    // Make a new database conenction
    let prisma = new PrismaClient()
    // error catching
    try{
        await prisma.folder.delete({data:{
            where:{
                id:req.params.id
            }
        }})
        await prisma.$disconnect()
        res.redirect("/user/"+ req.user.id)
    }catch(e){
        console.log("failure to delete", e)
    }

})
exports.createFile  = asyncHandler( async (req, res, next)=>{
    // instantiate database
    var prisma = new PrismaClient()
    // try to add a file, display error if not possible
    try{
        let { id } = req.params
        let file = req.file
        let fileURL = await uploadFileToCloud(req)
        await prisma.file.create({data:{
            name:file.originalname,
            url:`${fileURL}`,
            ownedByid:req.user.id,
            Folderid:parseInt(id),
            Bucketid:req.user.userbucketid,
            format:"FILE"
        },
        include:{
            ownedBy:true,
            Folder:true
        }
    })
    res.redirect(`/folder/${req.user.id}/${id}`)
}catch(e){
        console.log("Error in createFile Function in folderController", e)
    }
})

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