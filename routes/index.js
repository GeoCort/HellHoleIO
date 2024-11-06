var express = require('express');
const passport = require('passport');
var router = express.Router();
const bcrypt = require("bcrypt")
let userController = require("../controllers/userController.js")
const { PrismaClient}  = require("prisma/prisma-client")
var prisma = new PrismaClient()
var db = require("../prisma/prisma.js")
const userRouter = require("./users.js")
const folderRouter = require("./folder.js")
const fileRouter = require("./file.js")

/* GET home page. */
// Add the userController for /user
router.use("/user", userRouter)
router.use("/folder", folderRouter)
router.use("/file", fileRouter)
router.get('/', async function(req, res, next) {
  if(req.user){
    res.redirect(`/user/`+req.user.id)
  }
  res.render('index', { title: 'Express', user:req.user, folders:[] });
});
router.post("/login",passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
function(req, res) {
  res.redirect('/user/' + req.user.id);
});

router.post("/signUp", async (req, res, next)=>{
  // hash user password
  await bcrypt.hash(req.body.password, 10).then(async(hashedPassword) =>{
    await prisma.user.create({data:{
      username:req.body.username,
      password:hashedPassword,
      userbucket:{
          create:{name:'Origin'}
      }
  }},{
    include:{
      userbucket:true,
    }
  })
  await prisma.$disconnect()
  res.redirect("/")
  })
})
// logout and send to home page
router.post("/log-out", async (req,res,next)=>{
  try{
    req.logOut(req.user, (err)=>{
      console.log("logout function called")
      if(err) throw err;
      res.redirect('/')
    })
  }catch(e){
    console.log("logout error", e)
  }
    
  })
module.exports = router;
