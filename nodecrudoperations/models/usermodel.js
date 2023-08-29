const mongoose=require('mongoose');

const userschema=mongoose.Schema({
    name:{
       required:true,
       type:String,
       unique:true,
    },
    email:{
        required:true,
        type:String,
        lowercase:true
    },
    password:{
        required:true,
        type:String,
    }
})

module.exports=mongoose.model('userschema',userschema)