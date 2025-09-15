import { grenrateToken } from "../lib/utils.js";
import {User} from "../models/user.model.js";
export const signup= async(req,res)=>{
    const {email,fullName,password}= req.body;
   try{
    if(!fullName||!email||!password){
        return res.status(400).json({message:"All fields are required"});
    }
    if(password.length<6){
        return res.status(400).json({message:"Password must be at least 6 characters long"});
    }
    const existingUser= await User.find({email});
    if(existingUser){
        return res.status(400).json({message:"User already exists"});
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
export const login= async(req,res)=>{
    const {email,password}= req.body;
    try{
        const user= await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid email or password"});
        }
      const isPasswordCorrect= await bcrypt.comapre(password,user.password);
      if(!isPasswordCorrect){
        return res.status(400).json({message:"Invalid email or password"});
      }
        grenrateToken(user._id,res);
        res.status(200).json({
            message:"Login successful",
            user:{  
                _id:user._id,
                email:user.email,
                fullName:user.fullName,
            }
        });

    }
     catch(err){
         res.status(500).json({message:"Internal server error"});
    }

}
export const logout= (req,res)=>{
    try{
        res.cookie("jwt","",{
            maxAge:0,
             });
        res.status(200).json({message:"Logout successful"});
    }
    catch(err){
        res.status(500).json({message:"Internal server error"});
    }
}
export const updateProfile= async(req,res)=>{
    
}
