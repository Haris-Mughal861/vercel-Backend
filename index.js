require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');


const getConnection = require('./utils/getConnection');

 
const errorHandler = require('./middlewares/errorHandler.js');


const accountRoutes = require('./routes/account');
const galaryRoutes = require('./routes/galary');
const categoryRoutes = require('./routes/Category');
const productRoutes = require('./routes/products');
const brandRoutes = require('./routes/brands');
const dropdownRoutes = require('./routes/dropdown');
const reviewsRouter = require('./routes/reviews');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');
const sellerRoutes = require('./routes/seller');
const { registerSeller } = require('./controllers/Seller/sellerController');




const app = express();


const imageDir = path.join(__dirname, 'images');
if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir);
}


app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

app.get('/abc',(req,res)=>{
  res.send("hello")
})
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/images', express.static(imageDir));

app.use('/api/admin', require('./routes/admin'));


app.use('/api', require('./routes/blog.js'));
app.use('/user', accountRoutes);
app.use('/image', galaryRoutes);
app.use('/brand', brandRoutes);
app.use('/category', categoryRoutes);
app.use('/product', productRoutes);
app.use('/dropdown', dropdownRoutes);
app.use('/reviews', reviewsRouter);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);
app.use('/seller', sellerRoutes);
app.use('/api/payment', require('./routes/payment'));
app.use('/api', require('./routes/bannerRoutes'));
const Seller = require('./models/Seller'); 
const bcrypt = require('bcrypt');
const generateToken = require('./utils/generateToken'); 



app.post('/seller/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    
    const existingSeller = await Seller.findOne({ email });
    if (existingSeller) {
      return res.status(400).json({ status: false, message: 'Email already registered' });
    }

   
    const hashedPassword = await bcrypt.hash(password, 10);

    const newSeller = new Seller({
      name,
      email,
      password: hashedPassword,
      isApproved: true, 
    });

    await newSeller.save();

    const token = generateToken({ id: newSeller._id }); 

    res.status(201).json({
      status: true,
      message: 'Seller registered successfully',
      token,
      seller: {
        id: newSeller._id,
        name: newSeller.name,
        email: newSeller.email,
      },
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ status: false, message: 'Server error' });
  }
});






app.use(errorHandler);


getConnection();
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
});



  
 


    

