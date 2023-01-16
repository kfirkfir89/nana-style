import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import { createOrderStart } from "../../store/orders/order.action";
import { selectIsLoadingOrder, selectIsOrderSuccesded } from "../../store/orders/order.selector";

import { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { PaymentFormContainer, FormContainer, PaymentButton } from "./payment-form.styles";
import { useEffect } from "react";

const PaymentForm = () => {

  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const orderIsLoading = useSelector(selectIsLoadingOrder);
  const isOrderSuccesded = useSelector(selectIsOrderSuccesded);
  const navigate = useNavigate();
  
  useEffect(() => {
    return () => {
      navigate('/payment-succeeded');
    };
  }, [isOrderSuccesded === true]);
  
  const paymentHandler = (e) => {
    e.preventDefault();
    
    if(!stripe || !elements){
      return;
    }

    const card = elements.getElement(CardElement);
    const formFields = {amount, card, currentUser ,stripe};
    dispatch(createOrderStart(formFields));
    
  };

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment</h2>
        <CardElement />
        <PaymentButton isLoading={orderIsLoading} buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay Now</PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  )
}

export default PaymentForm;