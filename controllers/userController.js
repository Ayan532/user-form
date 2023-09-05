const { prisma } = require("../config/connect");
const BigPromises = require("../middlewares/BigPromises");
const ErrorHandler = require("../utils/ErrorHandler");


/*
  api -> /api/v1/register
  Method-> POST
  usage: To create user and their address
  resonse-> {
    "success": true,
    "user": {
        "id": "7ca82db8-415d-4bed-8a4b-2bb6feb91384",
        "name": "new",
        "createdAt": "2023-09-05T12:31:12.291Z",
        "address": {
            "id": "d0006c6f-7fdd-424d-8270-9d31ea0a18f1",
            "street": "124 road",
            "city": "Kolkata",
            "state": "WB",
            "postalCode": "71341",
            "userId": "7ca82db8-415d-4bed-8a4b-2bb6feb91384"
        }
    }
}*/
exports.registerUser=BigPromises(async(req,res,next)=>{
    const { name, street, city, state, postalCode } = req.body;
     if(!name || !street || !city || !state || !postalCode){
        return next(new ErrorHandler("Please add all feilds", 400));
     }
    const user=await prisma.user.create({
        data: {
            name,
            address: {
              create: {
                street,
                city,
                state,
                postalCode,
              },
            },
          },
          include: {
            address: true,
          },
    })
    if(!user){
      
      return next(new ErrorHandler("SOmething went wrong", 500))
    }
    res.status(200).json({
      success:true,
      user:`${user.name} your form had been Submited Successfully `,
      user
    })
})





/*
  api -> /api/v1/user/:id
  Method-> Get
  usage: To Fetch user by their id 
  response-> {
    "success": true,
    "user": {
        "id": "7ca82db8-415d-4bed-8a4b-2bb6feb91384",
        "name": "new",
        "createdAt": "2023-09-05T12:31:12.291Z",
        "address": {
            "id": "d0006c6f-7fdd-424d-8270-9d31ea0a18f1",
            "street": "124 road",
            "city": "Kolkata",
            "state": "WB",
            "postalCode": "71341",
            "userId": "7ca82db8-415d-4bed-8a4b-2bb6feb91384"
        }
    }
}*/
exports.getUserById=BigPromises(async(req,res,next)=>{
  

    const user=await prisma.user.findFirst({
        where:{
            id:req.params.id
        },
        include: {
            address: true,
          },
           
    })
    if(!user){
        return next(new ErrorHandler("No User Found", 404))
    }
    res.status(200).json({
      success:true,
      user
    })
})