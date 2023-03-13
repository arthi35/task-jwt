
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


app.listen(5000,()=>console.log("Server Connected"))

//mongodb+srv://user1:user123@cluster0.comux0j.mongodb.net/?retryWrites=true&w=majority