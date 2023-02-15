import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";

import { selectCurrentUser } from "../../store/user/user.selector";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectIsLoadingOrder, selectOrderDetails } from "../../store/orders/order.selector";

import { createOrderStart } from "../../store/orders/order.action";
import { resetCartItemsState } from "../../store/cart/cart.action";

import { useEffect, FormEvent } from "react";

import { PaymentFormContainer, FormContainer, PaymentButton } from "./payment-form.styles";

import { StripeFormFields } from "../../utils/stripe/stripe.utils";

import { BUTTON_TYPE_CLASSES } from '../button/button.component';


const ifValidCardElement = (card: StripeCardElement | null): card is StripeCardElement => card !== null;

const PaymentForm = () => {

  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const orderIsLoading = useSelector(selectIsLoadingOrder);
  const orderDetails = useSelector(selectOrderDetails);
  
  useEffect(() => {
    return () => {
      dispatch(resetCartItemsState());
      navigate('/payment-succeeded');
    };
  }, [orderDetails !== null]);
  
  const paymentHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!stripe || !elements){
      return;
    }

    const card = elements.getElement(CardElement);
    if(!ifValidCardElement(card)) return;

    dispatch(createOrderStart(amount, card, currentUser, stripe));
    
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