import { all, call, takeLatest, put , select } from "redux-saga/effects";

import { ORDER_ACTION_TYPES } from "./order.types";
import { orderSuccesded, orderFailed, resetOrderState } from "./order.action"; 

import * as cartSelectors from "../cart/cart.selector";

import { stripePaymentIntent, stripePaymentResult } from "../../utils/stripe/stripe.utils";
import { createNewOrderDocument } from "../../utils/firebase/firebase.utils";

function* getCartItemsSAGA() {
  const cartItems = yield select(cartSelectors.selectCartItems);
  return cartItems;
}

export function* paymentIntentCall({payload:{amount, card, currentUser , stripe}}) {
  try { 
    const orderItems = yield(call(getCartItemsSAGA));

    if(currentUser === null){
      currentUser = {
        displayName: 'Guest'
      }
    };

    const paymentIntentRespone = yield call(stripePaymentIntent, amount);
    const {paymentIntent: { client_secret }} = paymentIntentRespone;

    const  paymentResultRespone  = yield call(stripePaymentResult, card, currentUser ,stripe ,client_secret);

    const { paymentIntent, error } = paymentResultRespone;

    if(error){
      yield put(orderFailed(ORDER_ACTION_TYPES.FETCH_ORDER_FAILED));
      console.log('ERROR:', error.message);
      alert(error.message);

    }else{

      if(paymentIntent.status === 'succeeded'){

        const date = new Date();

        const newOrderDetails = {
          orderId: paymentIntent.created,
          createAt: date,
          user: currentUser,
          orderItems:orderItems,
          paymentIntent:paymentIntent,
        };

        yield call(createNewOrderDocument ,newOrderDetails);
        
        yield put(orderSuccesded(newOrderDetails));
      }
    } 
  } catch (error) {
    
    alert(error);
  }
};

/* export function* onStartResetOrderState() {
  try {
    yield put(resetOrderState());
  } catch (error) {
  }
};
 */

/* export function* onCreatingNewOrder() {
  yield takeLatest(ORDER_ACTION_TYPES.RESET_STATE, paymentIntentCall);
}; */

export function* onCreateOrderStart() {
  yield takeLatest(ORDER_ACTION_TYPES.FETCH_ORDER_START, paymentIntentCall);
};

export function* orderSaga(){
  yield all([
    call(onCreateOrderStart),
  ]);
};