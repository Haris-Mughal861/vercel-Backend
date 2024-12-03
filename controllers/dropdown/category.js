const Category = require('../../models/Category');

const categoryDropdown = async (req, res, next) => {
    try {
        const list = await Category.find().select('title image').sort({_id:-1});
        res.status(200).json({ message: 'success', status: true, list });
    } catch (error) {
        next(error);
    }
};

module.exports = categoryDropdown;
