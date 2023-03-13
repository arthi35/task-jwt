const mongoose=require('mongoose');

const contactSchema=mongoose.Schema({
user:{
type:mongoose.Schema.Types.ObjectId,
required:true,
ref:'User'
},

    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phoneNumber:{
        type:String,
        required:true,
        unique:true
    },
    
    dob:{
        type:String,
        required:true
    },
    company:{
        type:String
    }
})

module.exports=mongoose.model('Contact',contactSchema);