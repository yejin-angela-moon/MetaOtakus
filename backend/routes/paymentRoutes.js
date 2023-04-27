const express = require('express');
const router = express.Router();
const stripe = require('stripe')('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');


router.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body;
  
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100, // Convert the amount to cents
        currency: 'gbp',
      });
  
      res.status(200).send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      res.status(500).send({
        error: 'An error occurred while creating the payment intent',
      });
    }
  });
  

module.exports = router;

router.post('/add-card', async (req, res) => {
    const { paymentMethodId, email } = req.body;
  
    try {
      // Create a new customer or retrieve an existing one using the email provided
      let customer = await stripe.customers.list({ email, limit: 1 });
      if (!customer.data.length) {
        customer = await stripe.customers.create({ email, payment_method: paymentMethodId });
      } else {
        customer = customer.data[0];
        // Attach the payment method to the customer
        await stripe.paymentMethods.attach(paymentMethodId, { customer: customer.id });
      }
  
      res.status(200).send({
        customerId: customer.id,
      });
    } catch (error) {
      res.status(500).send({
        error: 'An error occurred while adding the card',
      });
    }
  });
  
