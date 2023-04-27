// Replace with your own publishable key
const stripe = Stripe('pk_live_51N1Ha2JltSnqu0beBMoqPsGW1JydAe9lrOQcHNVALljzlq93lTXMRswlbv5cd71sZg6vzquip8PgLCT0jhmOcW1i00OfvEewj6');
const elements = stripe.elements();

const card = elements.create('card');
card.mount('#card-element');

card.on('change', (event) => {
  const displayError = document.getElementById('card-errors');
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = '';
  }
});

const form = document.getElementById('payment-form');
form.addEventListener('submit', async (event) => {
    event.preventDefault();
  
    // Fetch the payment intent client secret from your server
    const response = await fetch('/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: 10, // Pass the amount to your server
      }),
    });
    const { clientSecret } = await response.json();
  
    // Confirm the payment
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
      },
    });
  
    if (result.error) {
      console.log('[error]', result.error);
    } else {
      // Handle payment success (e.g., redirect to a confirmation page)
      console.log('[PaymentIntent]', result.paymentIntent);
    }
  });
  
  const addCardForm = document.getElementById('addcard-form');

  if (addCardForm) {
    addCardForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const stripe = Stripe('pk_live_51N1Ha2JltSnqu0beBMoqPsGW1JydAe9lrOQcHNVALljzlq93lTXMRswlbv5cd71sZg6vzquip8PgLCT0jhmOcW1i00OfvEewj6');
  
      const cardholderName = document.getElementById('cardholder').value;
      const cardNumber = document.getElementById('cardnumber').value;
      const expiryMonth = document.getElementById('expiry-month').value;
      const expiryYear = document.getElementById('expiry-year').value;
      const cvv = document.getElementById('cvv').value;
  
      const card = {
        card: {
          number: cardNumber,
          exp_month: expiryMonth,
          exp_year: expiryYear,
          cvc: cvv,
        },
      };
  
      const { paymentMethod, error } = await stripe.createPaymentMethod('card', card);
  
      if (error) {
        console.error('Error creating payment method:', error);
        return;
      }
  
      // Save the payment method to the customer and store the customer ID for future payments
      // You'll need to send a request to your server to create a customer and attach the payment method
      // Inside the addCardForm event listener
        if (error) {
            console.error('Error creating payment method:', error);
            return;
        }
        
        try {
            const response = await fetch('/payment/add-card', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                paymentMethodId: paymentMethod.id,
                email: 'user_email', // Replace with the actual user email
            }),
            });
        
            const data = await response.json();
        if (data.error) {
            console.error('Error adding the card:', data.error);
            } else {
            console.log('Card added successfully:', data.customerId);
            // Redirect to another page or display a success message to the user
            }
            } catch (error) {
            console.error('Error sending the add card request:', error);
            }
   
    });
  }
  