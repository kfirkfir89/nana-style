
import { createAction } from "../../utils/reducer/reducer.utils";
import { ORDER_ACTION_TYPES } from './order.types';

export const orderSuccesded = (orderId, createAt, user) =>
  createAction(ORDER_ACTION_TYPES.FETCH_ORDER_SUCCESS, { orderId, createAt, user });

export const orderFailed = () =>
  createAction(ORDER_ACTION_TYPES.FETCH_ORDER_FAILED);

export const resetOrderState = () =>
  createAction(ORDER_ACTION_TYPES.RESET_STATE);

export const createOrderStart = ({amount, card, currentUser ,stripe}) =>
  createAction(ORDER_ACTION_TYPES.FETCH_ORDER_START, {amount, card, currentUser ,stripe} );