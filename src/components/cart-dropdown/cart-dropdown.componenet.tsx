import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import { selectCartItems, selectIsCartOpen } from "../../store/cart/cart.selector";

import { setIsCartOpen } from "../../store/cart/cart.action";
import { resetOrderState } from "../../store/orders/order.action"; 

import {CartDropdownContainer, EmptyMessage, CartItems} from './cart-dropdown.styles';

const CartDropdown = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const isCartOpen = useSelector(selectIsCartOpen);
  const navigate = useNavigate();

  const goToCheckOutHandler = useCallback(() => {
    dispatch(setIsCartOpen(!isCartOpen));
    dispatch(resetOrderState());
    navigate('/checkout');
  },[])

  return(
    <CartDropdownContainer>
      <CartItems>
        {
          cartItems.length ? cartItems.map(item => (
            <CartItem key={item.id} cartItem={item} />
          ))
          :
          (<EmptyMessage>Your cart is empty</EmptyMessage>)
        }
      </CartItems>
      <Button buttonType={BUTTON_TYPE_CLASSES.default} onClick={goToCheckOutHandler}>
        CHECK OUT
      </Button>
    </CartDropdownContainer>
  )

}

export default CartDropdown;