const express = require("express")
const folderController = require("../controllers/folderController")
const router = express.Router()
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

// Get all the folders for a user. 
router.get("/:id/:folderId", folderController.getFolderFiles)
// Create a new folder in a bucket no nested folders yet
router.post("/createFolder", folderController.createFolder)
router.post("/:id/upload",upload.single('file'), folderController.createFile)
router.delete("/:id", folderController.deleteFolder)
module.exports=  router