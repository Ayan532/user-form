const express=require('express')
const app=express()
require('dotenv').config()

app.use(express.json())

app.get('/',(req,res)=>{
    res.json("Testing")
})


app.listen(process.env.PORT,()=>{
    console.log(`Server Started at PORT:${process.env.PORT}`);
})