import { grenrateToken } from "../lib/utils.js";
import {User} from "../models/user.model.js";
export const signup= async(req,res)=>{
    const {email,fullName,password}= req.body;
   try{
    if(password.length<6){
        return res.status(400).json({message:"Password must be at least 6 characters long"});
    }
    const existingUser= await User.find({email});
    if(existingUser){
        return res.status(401).json({message:"User already exists"});
    }
    const salt= await bcrypt.genSalt(10);
    const hashPassword= await bcrypt.hash(password,salt);
    const newUser= new User({
        email:email,
        fullname:fullName,
        password:hashPassword,
    });

    if(newUser){
       grenrateToken(newUser._id,res);
       await newUser.save();
         return res.status(200).json({
        message:"User created successfully",
        user:{
            _id:newUser._id,
            email:newUser.email,
            fullName:newUser.fullName,
        }
    });

    }else{
        return res.status(400).json({message:"Invalid user data"});
    }

   }
    catch(err){
        res.status(500).json({message:"Internal server error"});
   }
}
export const login= (req,res)=>{
    res.send("This is login route");
}
export const logout= (req,res)=>{
    res.send("This is logout route");
}
