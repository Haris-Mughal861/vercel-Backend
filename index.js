require('dotenv').config();
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const getConnection = require('./utils/getConnection');
const errorHandler = require('./middlewares/errorHandler');
const galaryRoutes = require('./routes/galary');
const categoryRoutes = require('./routes/Category');
const productRoutes = require('./routes/products');
const path = require('path');
const brandRoutes = require("./routes/brands");
const dropdownRoutes = require('./routes/dropdown')
const reviewsRouter = require('./routes/reviews')
const cartRoutes = require('./routes/cart')
const orderRoutes = require('./routes/order')


const accountRoutes = require('./routes/account');







const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended:false}))
app.use('/images',express.static(path.join(__dirname,'images')))

app.use('/user',accountRoutes);
app.use('/image',galaryRoutes);
app.use('/brand',brandRoutes);
app.use('/category',categoryRoutes);
app.use('/product',productRoutes);
app.use('/dropdown',dropdownRoutes);
app.use('/reviews',reviewsRouter);
app.use('/cart',cartRoutes);
app.use('/order',orderRoutes);










app.use(errorHandler);
getConnection();
app.listen(process.env.PORT, () => {
    console.log(`Server is listening to port: ${process.env.PORT}`);
});

  
  



    

