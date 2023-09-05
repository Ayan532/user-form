const { prisma } = require("../config/connect");
const BigPromises = require("../middlewares/BigPromises");
const ErrorHandler = require("../utils/ErrorHandler");

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