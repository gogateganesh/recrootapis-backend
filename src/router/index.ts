
import { createBlog, deleteBlog, updateBlog } from "../controller/blogController";
import express from "express";

const router = express.Router();

// Define your routes
router.post('/createBlog', createBlog)
router.delete('/deleteBlog/:id', deleteBlog)
router.put('/updateBlog/:id', updateBlog)

export default router;