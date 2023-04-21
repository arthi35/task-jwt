
const express=require('express');

const app=express();

app.use(express.json())
app.use(express.urlencoded({extended:false}))
const db=require('./db/connect');

const dotenv = require("dotenv");

dotenv.config()

//Import Routes
const contactRoutes=require('./routes/contactRoutes')
const userRoutes=require('./routes/userRoutes')


//Route Middleware

db();
app.use('/api/contact',contactRoutes);
app.use('/api/users',userRoutes)
app.get('/',(req,res)=>{
    console.log("Server Connected")
})

app.listen(5000,()=>console.log("Server Connected"))

