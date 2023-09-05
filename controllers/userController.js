const { prisma } = require("../config/connect");

exports.registerUser=async(req,res)=>{
    const { name, street, city, state, postalCode } = req.body;
   
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
    res.status(200).json({
      success:true,
      user:`${user.name} your form had been Submited Successfully `,
      user
    })
}
exports.getUserById=async(req,res)=>{
  
    const user=await prisma.user.findFirst({
        where:{
            id:req.params.id
        },
        include: {
            address: true,
          },
           
    })
    res.status(200).json({
      success:true,
      user
    })
}