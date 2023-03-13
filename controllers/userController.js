const User=require('../model/userModel')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const registerUser=async(req,res)=>{
    const {name,email,password}=req.body;
    if(!name||!email||!password){
        return res.status(400).json({err:"Please fill all the fields"})
    }
    const userExists=User.findOne({email})
    if(userExists){
        return res.status(400).json("User Already Exits")
    }

    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);

    //create user

    const user=await User.create({
        name,email,password:hashedPassword
    })

    if(user){
        return res.status(200).json({
            id:user._id,name:user.name,email:user.email,status:"user created"
        })
    }else{
        return res.status(400).json({msg:"Invalid User Data"})
    }
    res.status(200).json('register user')
}

const loginUser=async(req,res)=>{
    const{email,password}=req.body;
    const user=await User.findOne({email})

    if(user&&(await bcrypt.compare(password,user.password))){
        return res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id),
            status:"Login Successfull"
        })
    }else{
        return res.status(404).json({msg:"Invalid Data"})
    }
    res.status(200).json('Login user')
}

const getMe=async(req,res)=>{
const {_id,name,email}=await User.findById(req.user.id);

  return res.status(200).json({_id,name,email})
}

//generate token

const generateToken=(id)=>{
return jwt.sign({id},process.env.JWT_SECRET,{
    expiresIn:'20d'
})
}

module.exports={registerUser,loginUser,getMe}