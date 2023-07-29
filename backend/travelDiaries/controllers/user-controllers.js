export const getAllUsers=async()=>{
    let users;
    try{
        users=await User.find();
    } catch(err){
        console.log(err);
    }
    if (!users){
        return res.status(500).json({message:"unexpected Error Occured"});
    }
    return res.status(200).json({users});
};