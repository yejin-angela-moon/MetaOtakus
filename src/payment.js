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
  
  const { error, paymentMethod } = await stripe.createPaymentMethod({
    type: 'card',
    card: card,
  });

  if (error) {
    console.log('[error]', error);
  } else {
    // Send the paymentMethod.id to your server for further processing
    console.log('[PaymentMethod]', paymentMethod);
  }
});
