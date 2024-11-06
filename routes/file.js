const express = require("express")
const router = express.Router()
const fileRouter = require("../controllers/fileController.js")
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

router.post("/upload", upload.single("file"), fileRouter.uploadFile)
router.post("/delete/:id", fileRouter.deleteFile)
module.exports= router