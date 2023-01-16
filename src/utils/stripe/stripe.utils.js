import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
  );
  
export const stripePaymentIntent = (amount) => {

  return new Promise((resolve) => {
    fetch('/.netlify/functions/create-payment-intent', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount: amount * 100 }),
    }).then((res) => {
      resolve(res.json());
    })
  });
};

export const stripePaymentResult = (card, currentUser ,stripe ,client_secret) => {
  return new Promise((resolve) => {
    stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: card,
        billing_details: {
          name: currentUser ? currentUser.displayName : 'Guest',
        }
      }
    }).then((res) => {
      resolve(res);
    })
  });
};

/* 
export const stripePaymentIntent = async ({amount}) => {
    
    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount: amount * 100 }),
    }).then(res => {return res.json()});
  
    console.log('response result:',response);
      
    const {paymentIntent: { client_secret }} = response;

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: card,
        billing_details: {
          name: currentUser ? currentUser.displayName : 'Guest',
        }
      }
    });
    console.log('payment result:',paymentResult);

    if(paymentResult.error){
      return paymentResult.error;
    }
    else if(paymentResult.paymentIntent.status === 'succeeded'){
      return paymentResult.paymentIntent;
    }
}; */