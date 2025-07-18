import httpStatus from 'http-status';
import {User} from "../models/userModel.js";
import {Meeting} from "../models/meetingModel.js";
import bcrypt ,{hash} from 'bcrypt';
import crypto from 'crypto';


const login = async (req,res)=>{
    const {username,password}=req.body;

    if(!username || !password){
        return res.status(httpStatus.BAD_REQUEST).json({message:"Please enter both username and password"})
    }
    try{
        const user = await User.findOne({username});
        if(!user){
            return res.status(httpStatus.NOT_FOUND).json({message:"Invalid username or password"})
        }
          let isPassword =await bcrypt.compare(password,user.password);
        if(isPassword){
            let token =crypto.randomBytes(20).toString("hex");
            user.token = token;
            await user.save();
            return res.status(httpStatus.OK).json({
                token:token
            })
        }else{
            return res.status(httpStatus.UNAUTHORIZED).json({message:"Invalid username or password"});
        }

    }catch(e){
        return res.status(httpStatus[500]).json({
            message:`Something went wrong ${e}`
        })

    }

}






const register = async (req ,res)=>{
    const {name , username , password} = req.body;
    try{
        const existingUser = await User.findOne({username});
        if(existingUser){
            return res.status(httpStatus.FOUND).json ({
                message:"User already exsits"
            })
        }
        const hashedPassword = await bcrypt.hash(password,10);
        
        const newUser = new User({
            name: name,
            username:username,
            password:hashedPassword
        });
        await newUser.save();
        res.status(httpStatus.CREATED).json({
            message:"User created successfully"
        })
        
    }catch(e){
           res.json({
            message:`Something went wrong ${e}`
           })
    }
}

const getUserHistory = async (req,res)=>{
    const {token} = req.query;
    try {
        const user = await User.findOne({token:token});
        const meetings = await Meeting.find({user_id:user.username});
        res.json(meetings) 
    } catch (error) {
        res.json({
            message:`Something went wrong ${error}`
        })
    }
}
const addToHistory = async (req,res)=>{
const {token,meeting_code} = req.body;
try{
    const user = await User.findOne({token:token});
    const newMeeting = new Meeting({
        user_id:user.username,
        meetingCode:meeting_code
    });
    await newMeeting.save();
    res.status(httpStatus.CREATED).json({
        message:"Meeting added to history"
    })
}catch(e){
    res.json({
        message:`Something went wrong ${e}`
    })
}
}





export {login,register ,getUserHistory,addToHistory};