const Order = require('../../models/Order');
const Cart = require('../../models/Cart');
const stripePayment = require('../../utils/stripePayment');
const User = require ('../../models/User')

const placeOrder = async (req, res, next) => {
    const { number, cvc, exp_month, exp_year, address} = req.body;
    const userId = req.userId;
    try {
        const findedCart = await Cart.find({ user: userId }).populate([
            {
                path: 'product',
            },
        ]);
        if(findedCart.length ===0){
            const error = new Error('no item for order')
            error.statusCode = 400;
            throw error;
        }




        const orderTotal = findedCart.reduce((acc,curr)=>{
            return acc +=curr.cartTotal
        },0);

        const result = await stripePayment(number,cvc,exp_month,exp_year,orderTotal);
        if(result?.status !== "succeeded"){
            const error = new Error('stripe payment failed')
            error.statusCode = 400;
            throw error;
        }

const newOrder = new Order({
    products: findedCart.map((item)=>{
        return {...item._doc}
    }),
    user: userId,
    orderTotal: orderTotal,
    address: address,



});
const savedOrder = await newOrder.save();
await Cart.deleteMany({user:userId});
await User.findByIdAndUpdate(userId,{$push:{order:savedOrder._id}})



        res.status(200).json({ message: "Order placed successfully", status: true, findedCart });
    } catch (error) {
        next(error);
    }
};

module.exports = placeOrder;
