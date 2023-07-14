import express from "express";
import {login, register} from "../controller/userController"
import { getAllBlogs, getBlogById } from "../controller/blogController";


const router = express.Router();

// Define your routes
router.get("/blogs",getAllBlogs)
router.get("/blog/:id",getBlogById)
router.post('/login',login)
router.post('/register',register)

export default router;