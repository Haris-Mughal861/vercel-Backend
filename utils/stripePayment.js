const stripe = require('stripe')(process.env.STRIPE_SECRET)


const stripePayment = async (number,cvc,exp_month,exp_year,amount)=>{



    try{
        const paymentMethod = await stripe.paymentMethods.create({
            type: "card",
            card: {
                number: number,
                exp_month: exp_month,
                exp_year: _year,
                cvc: cvc
                },

        })
        const paymentIntents = await stripe.paymentIntents.create({
            amount: amount*100,
            currency: 'PKR',
            payment_method: paymentMethod.id,
            confirm:true,
            return_url: "http://localhost:3000/",
            })
            return paymentIntent
            }catch(error){
                console.log(error)

            }
        };
        module.exports = stripePayment;






    
