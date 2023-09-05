/*--------------------IMPORTS------------------*/
const express=require('express')
const app=express()
const ErrorMiddleware = require('./middlewares/ErrorMiddleware')
require('dotenv').config()



/*--------------------Routes Imports------------------*/
const user=require('./routes/userRoutes')



/*--------------------Middlewares------------------*/
app.use(express.json())

/*------------------Routes--------------------*/
app.get('/',(req,res)=>{
    res.json("Testing")
})

app.use('/api/v1',user)


app.use(ErrorMiddleware)

app.listen(process.env.PORT,()=>{
    console.log(`Server Started at PORT:${process.env.PORT}`);
})