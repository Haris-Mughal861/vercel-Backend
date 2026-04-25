require('dotenv').config();
const mongoose = require('mongoose');

console.log('Testing connection to:', process.env.MONGO_URI.replace(/:([^@]+)@/, ':****@'));

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('SUCCESS: DB is connected');
        process.exit(0);
    })
    .catch((error) => {
        console.error('FAILURE: Connection failed');
        console.error('Error Code:', error.code);
        console.error('Error Message:', error.message);
        process.exit(1);
    });

setTimeout(() => {
    console.error('TIMEOUT: Connection attempt timed out after 20 seconds');
    process.exit(1);
}, 20000);
