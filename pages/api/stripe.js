import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_S_KEY)

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log(req.body)
    try {
      // Create Checkout Sessions from body params.
      const params = {
        submit_type: 'pay',
        mode:'payment',
        payment_method_types:['card'],
        billing_address_collection:'auto',
        line_items: req.body.map((item)=>{
          let discountPrice;
          if (item.discount && item.discount !== 0) {
              const percentofprice = (item.discount / 100) * item.price;
              discountPrice = item.price - percentofprice
          }
          return{
            price_data:{
              currency:'inr',
              product_data:{
                name: item.name
              },
              unit_amount: discountPrice ? discountPrice * 100 : item.price * 100
            },
            adjustable_quantity: {
              enabled:true,
              minimum: 1,
              maximum:200
            },
            quantity: item.quantity 
          }
        }),
        mode: 'payment',
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      }
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}