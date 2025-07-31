const fs = require('fs');

const checkImgMimetype = (req, res, next) => {
    try {
        if (req.file && !['image/png', 'image/jpg', 'image/jpeg'].includes(req.file.mimetype)) {
            const error = new Error('Invalid image format. Allowed formats are PNG, JPG, and JPEG.');
            error.statusCode = 400;
            throw error;
        }
        next();
    } catch (error) {
        if (req.file && req.file.path) {
            fs.unlink(req.file.path, (err) => {
                if (err) console.error(err);
            });
        }
        next(error);
    }
};

module.exports = checkImgMimetype;
