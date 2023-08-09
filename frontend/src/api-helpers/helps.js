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

export const SendAuthRequest = async (signup, data) => {
    try {
      const res = await axios.post(`/user/${signup ? "signup" : "login"}/`, {
        name: data.name ? data.name : "",
        email: data.email,
        password: data.password,
    });
    
  
      if (res.status !== 200 && res.status !== 201) {
        console.log("Unable to Authenticate");
        return null;
      }
  
      const resData = res.data;
      return resData;
    } catch (err) {
      console.log(err);
      return null;
    }
  };
  


export const addBlog=async(data)=>{
    const res=await axios.post("/blogs/addblog",
    {
        title:data.title,
        description:data.description,
        location:data.location,
        image:data.imageUrl,
        date:data.date,
        user:localStorage.getItem("userId"),
    }).catch((err)=>console.log(err));

    if(res.status!==201){
        return console.log("Error occured")
    }
    const resData=await res.data;
    return resData;

}

export const getBlogDetails=async(id)=>{
  const res=await axios.get(`/blogs/${id}`).catch((err)=>console.log(err));
  if(res.status!==200)
  {
    return console.log("Unable ti fetch Blog");
  }
  const resData=await res.data;
  return resData;
}


export const blogUpdate=async(data,id)=>{
  const res=await axios.put(`blogs/${id}`,{
    title:data.title,
    description:data.description,
    location:data.location,
    image:data.imageUrl,
  }).catch(err=>console.log(err));
  if(res.status!==200)
  {
    return console.log("Unable to Update Blog");
  }

  const resData=await res.data;
  return resData
};


export const blogDelete=async(id)=>{
  const res=await axios
  .delete(`blogs/${id}`)
  .catch(err=>console.log(err));

  if(res.status!==200){
    return console.log("Unable to delete");
  }
    const resData=await res.data;
    return resData;

}

export const getUserDetails=async()=>{
  const id=localStorage.getItem("userId");
  const res=await axios.get(`/user/${id}`).catch((err)=>console.log(err));
  if(res.status!==200)
  {
    return console.log("No User Found");
  }
  const resData=await res.data;
  return resData;
}