import mongoose ,{ Schema } from "mongoose";

const userSchema = new Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            default :'No',
        },
       
    }

)

const User = mongoose.model("User",userSchema);

export {User};