const express=require('express')
const app=express()
require('dotenv').config()

app.use(express.json())

const user=require('./routes/userRoutes')

app.get('/',(req,res)=>{
    res.json("Testing")
})

app.use('/api/v1',user)


app.listen(process.env.PORT,()=>{
    console.log(`Server Started at PORT:${process.env.PORT}`);
})