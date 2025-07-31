const express = require('express');
const router = express.Router();
const {
  addBlog,
  getAllBlogs,
  getBlogById,
  getSellerBlogs,
  deleteBlog,
  getMyBlog
} = require('../controllers/blogController');
const isAuth = require('../middlewares/isAuth');
const fileUpload = require('../middlewares/fileUpload');

router.post('/seller/add-blog', isAuth, fileUpload.single('image'), addBlog);
router.get('/blogs', getAllBlogs);
router.get('/blogs/:id', getBlogById);           
router.get('/seller/blogs', isAuth, getSellerBlogs);
router.get('/seller/my-blog', isAuth, getMyBlog); 
router.delete('/seller/delete-blog/:id', isAuth, deleteBlog);

module.exports = router;
