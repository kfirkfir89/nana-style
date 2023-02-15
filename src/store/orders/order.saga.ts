import { all, call, takeLatest, put , select } from "typed-redux-saga/macro";

import { ORDER_ACTION_TYPES } from "./order.types";
import { CreateOrderStart, orderSuccesded, orderFailed } from "./order.action"; 

import * as cartSelectors from "../cart/cart.selector";
import { NewOrderDetails } from "./order.types";

import { stripePaymentIntent, stripePaymentResult, StripeFormFieldAmount } from "../../utils/stripe/stripe.utils";
import { createNewOrderDocument } from "../../utils/firebase/firebase.utils";

function* getCartItemsSAGA(){
  const cartItems = yield* select(cartSelectors.selectCartItems);
  return cartItems;
}

export function* paymentIntentCall({payload:{amount, card, currentUser, stripe}}: CreateOrderStart) {
  try { 
    const orderItems = yield* call(getCartItemsSAGA);
    const paymentIntentRespone = yield* call(stripePaymentIntent, amount);
    console.log("first respone",paymentIntentRespone);
    if(paymentIntentRespone.paymentIntent !== undefined && 
      paymentIntentRespone.paymentIntent.client_secret !== null){
        const { client_secret } = paymentIntentRespone.paymentIntent;
        try {
        const  paymentResultRespone  = yield* call(stripePaymentResult, card, currentUser ,stripe , client_secret);
        if(paymentResultRespone.paymentIntent !== undefined &&
           paymentResultRespone.paymentIntent.status === 'succeeded'){
          const date = new Date();
    
          const newOrderDetails: NewOrderDetails = {
            orderId: paymentResultRespone.paymentIntent.created,
            createAt: date,
            user: currentUser,
            orderItems: orderItems,
            paymentIntent:paymentResultRespone.paymentIntent,
          };
        console.log("newOrderDetailsnewOrderDetails",newOrderDetails);
          
          yield* call(createNewOrderDocument ,newOrderDetails);
          
          yield* put(orderSuccesded(newOrderDetails));
        }
        
      } catch (error) {
          yield* put(orderFailed(error as Error));
          console.log('ERROR:', error);
          alert(error);
        
      }
    } 
  } catch (error) { 
    yield* put(orderFailed(error as Error));
    alert(error);
  }
};

export function* onCreateOrderStart() {
  yield* takeLatest(ORDER_ACTION_TYPES.FETCH_ORDER_START, paymentIntentCall);
};
export function* onCreateOrderStart2() {
  yield* takeLatest(ORDER_ACTION_TYPES.FETCH_ORDER_START, getCartItemsSAGA);
};

export function* orderSaga(){
  yield* all([
    call(onCreateOrderStart),
  ]);
};