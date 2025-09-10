export const signup= (req,res)=>{
    const {email,fullName,password}= req.body;
   try{


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
