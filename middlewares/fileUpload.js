const multer = require('multer');

const fileUpload = () => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'images'); 
        },
        filename: (req, file, cb) => {
            const num = Math.floor(Math.random() * 1e9); 
            cb(null, num + '-' + file.originalname); 
        },
    });

    const upload = multer({ storage: storage }).single('image');

    return (req, res, next) => {
        upload(req, res, (err) => {
            if (err) {
                return res.status(500).send({ error: "File upload failed!" });
            }
            next(); 
        });
    };
};

module.exports = fileUpload;

