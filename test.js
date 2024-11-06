const {PrismaClient} = require("@prisma/prisma/client")
async function run(){
    const user  = await PrismaClient.user.create({data:{
        username:"meow",
        password:"meow"
    }})
    await PrismaClient.folder.create({data:{
        name:"folder1",
        userId:user
    }})
}
run()