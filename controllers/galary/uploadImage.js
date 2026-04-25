const Galary = require('../../models/Galary');
const cloudinary = require('../../utils/cloudinary');

const uploadImage = async (req, res, next) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded', status: false });
        }

        const savedImages = [];

        for (let file of req.files) {
            // Upload to Cloudinary using stream
            const uploadPromise = new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: 'gallery' },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                uploadStream.end(file.buffer);
            });

            const result = await uploadPromise;

            const newImage = new Galary({
                image: result.secure_url,
            });

            const savedImage = await newImage.save();
            savedImages.push(savedImage.image);
        }

        res.status(201).json({
            message: 'Images uploaded successfully',
            status: true,
            images: savedImages,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = uploadImage;
