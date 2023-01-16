import { all, call, takeLatest, put , } from "redux-saga/effects";

import { useNavigate } from "react-router-dom";

import { ORDER_ACTION_TYPES } from "./order.types";
import { orderSuccesded, orderFailed } from "./order.action"; 

import { stripePaymentIntent, stripePaymentResult } from "../../utils/stripe/stripe.utils";
import { createNewOrderDocument } from "../../utils/firebase/firebase.utils";
/* export function* signUp({payload: {email, password, displayName}}){
  try {
    const { user } = yield call(createAuthUserWithEmailAndPassword, email, password);
    yield put(signUpSuccess( user, { displayName }));

  } catch (error) {
    yield put(signUpFailed(error));
  }
}; */

export function* paymentIntentCall({payload:{amount, card, currentUser ,stripe}}) {

  try { 

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
          paymentIntent:paymentIntent,
        };

        yield call(createNewOrderDocument ,newOrderDetails);

        const { orderId, createAt, user } = newOrderDetails;
        
        yield put(orderSuccesded(orderId, createAt, user));
      }
    } 
  } catch (error) {
    
    alert(error);
  }
  };


/* export function* onOrderSuccess() {
  console.log("SAGAsucecsss");
  yield takeLatest(ORDER_ACTION_TYPES.FETCH_ORDER_SUCCESS, newOrderSucceeded);
};
 */
/* export function* onOrderFailed() {
  console.log("SAGA");
  yield takeLatest(ORDER_ACTION_TYPES.FETCH_ORDER_FAILED, paymentIntentCall);
}; */

export function* onCreateOrderStart() {
  yield takeLatest(ORDER_ACTION_TYPES.FETCH_ORDER_START, paymentIntentCall);
};

export function* orderSaga(){
  yield all([
    call(onCreateOrderStart),
  ]);
};