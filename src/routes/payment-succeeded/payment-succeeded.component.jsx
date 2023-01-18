
import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { selectSuccesededOrderDetails } from "../../store/orders/order.selector";

import { resetOrderState } from "../../store/orders/order.action";

import CheckoutItem from '../../components/checkout-item/checkout-item.component';

export const PaymentSucceeded = () => {
  
  const orderDetails = useSelector(selectSuccesededOrderDetails);
  const { createAt, orderId, user, orderItems } = orderDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetOrderState());

    }
  })

  return(
    <div>
      <h1>ty {user.displayName}</h1>
      {
        orderItems.map((cartItem) => (<CheckoutItem key={cartItem.id} cartItem={cartItem} />))
      }
      <span>Payment Successful on {createAt.toString()}</span>
      <span>Your Order Number: {orderId}</span>
    </div>
  )
}

export default PaymentSucceeded;