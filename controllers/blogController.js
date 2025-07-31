const Blog = require('../models/Blog');

const addBlog = async (req, res, next) => {
  try {
    const { title, summary, content } = req.body;
    const image = req.file?.filename;
    const seller = req.user._id;

    const existingBlog = await Blog.findOne({ seller });
    if (existingBlog) {
      return res.status(400).json({
        status: false,
        message: "You have already created a blog.",
      });
    }

    if (!title || !summary || !content || !image || !seller) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBlog = new Blog({ seller, title, summary, content, image });
    await newBlog.save();

    res.status(201).json({ status: true, blog: newBlog });
  } catch (err) {
    next(err);
  }
};

const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find()
      .populate('seller', 'name email')
      .sort({ createdAt: -1 });

    res.json({ status: true, blogs });
  } catch (err) {
    next(err);
  }
};

const getSellerBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({ seller: req.user._id });
    res.status(200).json({ status: true, blogs });
  } catch (err) {
    next(err);
  }
};

const getMyBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findOne({ seller: req.user._id });
    if (!blog) return res.status(200).json({ exists: false });
    res.status(200).json({ exists: true, blog });
  } catch (err) {
    next(err);
  }
};

const getBlogById = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('seller', 'name email');
    if (!blog) {
      return res.status(404).json({ status: false, message: "Blog not found" });
    }
    res.json({ status: true, blog });
  } catch (err) {
    next(err);
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findOneAndDelete({ _id: blogId, seller: req.user._id });

    if (!blog) {
      return res.status(404).json({ status: false, message: "Blog not found or unauthorized" });
    }

    res.json({ status: true, message: "Blog deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addBlog,
  getAllBlogs,
  getSellerBlogs,
  deleteBlog,
  getMyBlog,
  getBlogById,
};
