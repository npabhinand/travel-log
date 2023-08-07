import axios from "axios";

export const getAllBlogs=async()=>
{
    const res=await axios.get("http://localhost:5000/blogs");
    if(res.status !==200){
        return console.log("Error occured");
    }
    const data=res.data;
    return data;
}

export const SendAuthRequest=async(signup,data)=>{
    const res =await axios.post(`?user/${signup?"signup":"login"}/`,{
        name:data.name ? data.name:"",
        email:data.email,
        password:data.password
    })
    .catch((err)=>console.log(err));
    
    if(res.status!==200||res.status!==201){
        return console.log("Unable to Authenticate");
    }
    const resData=await res.data;
    return resData;

};