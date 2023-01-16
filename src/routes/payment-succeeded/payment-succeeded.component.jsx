
import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { selectSuccesededOrderDetails } from "../../store/orders/order.selector";

import { resetCartItemsState } from "../../store/cart/cart.action";
import { resetOrderState } from "../../store/orders/order.action";

export const PaymentSucceeded = () => {
  
  const succesededOrderDetails = useSelector(selectSuccesededOrderDetails);
  const { createAt, orderId, user } = succesededOrderDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetOrderState());
      dispatch(resetCartItemsState());
    }
  })

  return(
    <div>
      <h1>ty {user.displayName}</h1>
      <span>Payment Successful on {createAt.toString()}</span>
      <span>Your Order Number: {orderId}</span>
    </div>
  )
}

export default PaymentSucceeded;