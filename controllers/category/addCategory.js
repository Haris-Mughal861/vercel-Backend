const Category = require('../../models/Category');

const addCategory = async (req, res, next) => {
  try {
    console.log("REQ.BODY:", req.body);
    console.log("REQ.FILE:", req.file);

    const title = req.body.title;
    const image = req.file ? req.file.filename : null;

    
    if (!title || title.trim().length < 2) {
      return res.status(400).json({ message: "Invalid category name" });
    }

    const findedCategory = await Category.findOne({ title: title.trim() });
    if (findedCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    
    const newCategory = new Category({
      title: title.trim(),
      image: image || '',
    });

    const savedCategory = await newCategory.save();

    return res.status(201).json({
      message: "Category created successfully",
      savedCategory,
      status: true,
    });

  } catch (error) {
    console.error("Error while adding category:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = addCategory;
