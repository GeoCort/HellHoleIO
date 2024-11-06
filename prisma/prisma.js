const {PrismaClient}= require("prisma/prisma-client");
const { connect } = require("../controllers/userController");
let prisma = new PrismaClient()
async function main(){
        const prisma = new PrismaClient()
        try{
            await prisma.file.create({data:{
                name:file.originalname,
                url:fileURL,
                ownedByid:req.user.id,
                folder:id,
                Bucketid:req.user.userbucketid
            },
            include:{
                ownedBy:true,
                folder:true
            }
        })
    }catch(e){
        console.log(e)
        console.log("/folder, most likely db error")
    }}
//   main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })
  exports.default = prisma;