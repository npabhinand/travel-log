
 // Corrected the typo
import {Router} from "express";
import {  getAllBlogs,addBlog,getBlogById, updateBlog, deleteBlog } from "../controllers/blog-contollers.js";

const blogRouter = Router();
blogRouter.get("/",getAllBlogs);
blogRouter.post("/addblog",addBlog);
blogRouter.get("/:id",getBlogById);
blogRouter.put("/:id",updateBlog);
blogRouter.delete("/:id",deleteBlog);


export default blogRouter;
