const fs = require('fs');

const checkImgSize = (req, res, next) => {
    try {
        if (req.file && req.file.size > 1024 * 1024 * 3) { 
            const error = new Error('File size must be 3MB or less');
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

module.exports = checkImgSize;
