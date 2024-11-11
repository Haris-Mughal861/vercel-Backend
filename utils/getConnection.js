const mongoose = require('mongoose');  // Keep only this line

const getConnection = () => {
    try {
        mongoose.connect(process.env.MONGO_URI)
            .then((connection) => {
                console.log('DB is connected');
            })
            .catch((error) => {
                console.log("Failed to connect to DB:", error.message);
            });
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = getConnection;
