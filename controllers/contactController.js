const Contact=require('../model/contactModel');
const User=require('../model/userModel')
const getContact=async(req,res)=>{
    const contacts=await Contact.find({user:req.user.id});
    res.status(200).json(contacts)
}

const setContact=async(req,res)=>{
    const{firstname,lastname,email,phoneNumber,dob,company}=req.body;

    if(!(firstname&&lastname&&email&&phoneNumber&&dob&&company)){
        res.status(400);
        throw new Error('Please Add Details')
    }
    const contacts=await Contact.create({
firstname:req.body.firstname,
lastname:req.body.lastname,
email:req.body.email,
phoneNumber:req.body.phoneNumber,
dob:req.body.dob,
company:req.body.company,
user:req.user.id
    })
    res.status(200).json(contacts)
}

const updateContact=async(req,res)=>{
   const contacts=await Contact.findById(req.params.id);

   if(!contacts){
    res.status(400);
    throw new error("Contacts Not Found");
   }
const user=await User.findById(req.user.id)

if(!user){
    return res.status.json({msg:"User Not Found"})
}

if(contacts.user.toString() !==user.id){
    return res.status(401).json({msg:"User Not Authorized"})
}
const updateContact=await Contact.findByIdAndUpdate(req.user.id,req.body,{new:true})

return res.status(200).json(updateContact)

  

}

const deleteContact=async(req,res)=>{
    const contacts=await Contact.findById(req.params.id)
if(!contacts){
    res.status(400);
    throw new Error('Contacts Not Found')
}
Contact.findByIdAndDelete(req.params.id)
.then(()=>res.status(200).json('Contact Deleted'))
res.status(200).json('delete Contact')
}
module.exports={getContact,setContact,updateContact,deleteContact}