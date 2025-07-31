const Cart = require('../../models/Cart');
const Product = require('../../models/Product');

const addToCart = async (req, res, next) => {
  const productId = req.query.productId;
  const userId = req.userId;

  try {
    const findedProduct = await Product.findById(productId);
    if (!findedProduct) {
      return res.status(404).json({ message: 'Product not found', status: false });
    }

    const price = Number(findedProduct.sale_price) || 0;

    const findedCart = await Cart.findOne({ user: userId, product: productId });

    if (findedCart) {
      findedCart.quantity += 1;
       console.log("Price:", price, "Quantity:", findedCart.quantity, "Total:", price * findedCart.quantity);
      findedCart.cartTotal = price * findedCart.quantity; 
      await findedCart.save();
    } else {
      const newCart = new Cart({
        user: userId,
        product: productId,
        quantity: 1,
        cartTotal: price,
      });
      await newCart.save();
    }

    res.status(200).json({ message: 'Item added to cart', status: true });
  } catch (error) {
    next(error);
  }
};

module.exports = addToCart;
