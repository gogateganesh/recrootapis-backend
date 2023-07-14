import Blog from "../modules/Blog";

export const createBlog = async (req, res) => {
  // Controller logic
  const { title, content } = req.body;

  try{
    const blog = await Blog.create({title, content, createdAt:new Date()});
    res.status(201).json(blog)
  }catch(err){
    res.status(500).send('Internal Server Error' + err);
  }
}


export const deleteBlog = async (req, res) => {
  // Controller logic
  const { id } = req.params;

  try {
    // Find the blog by its ID and delete it
    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      // If the blog with the specified ID is not found, return an error message
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).send('Internal Server Error: ' + err);
  }
}

export const updateBlog = async (req, res) => {
  // Controller logic
  const { id } = req.params;
  const { title, content, postedBy } = req.body;

  try {
    // Find the blog by its ID and update its fields
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, content, postedBy },
      { new: true }
    );

    if (!updatedBlog) {
      // If the blog with the specified ID is not found, return an error message
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.status(200).json(updatedBlog);
  } catch (err) {
    res.status(500).send('Internal Server Error: ' + err);
  }
}


export const getBlogById = async (req, res) => {
  // Controller logic
  const { id } = req.params;

  try {
    // Find the blog by its ID
    const blog = await Blog.findById(id);

    if (!blog) {
      // If the blog with the specified ID is not found, return an error message
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.status(200).json(blog);
  } catch (err) {
    res.status(500).send('Internal Server Error: ' + err);
  }
};


export const getAllBlogs = async (req, res) => {
  try {
    // Retrieve all blogs from the database
    const blogs = await Blog.find();

    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).send('Internal Server Error: ' + err);
  }
};









