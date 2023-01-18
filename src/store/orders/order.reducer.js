import { ORDER_ACTION_TYPES } from './order.types';

export const ORDERS_INITIAL_STATE = {
  isLoading: false,
  orderDetails: null,
};

export const orderReducer = (state = ORDERS_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch(type) {
    case ORDER_ACTION_TYPES.FETCH_ORDER_START:{
      return{
        ...state,
        isLoading: true,
      };
    }
    case ORDER_ACTION_TYPES.FETCH_ORDER_SUCCESS:{
      return{
        ...state,
        isLoading: false,
        isOrderSuccesded: true,
        orderDetails: payload,
      };
    }
    case ORDER_ACTION_TYPES.FETCH_ORDER_FAILED:{
      return{
        ...state,
        isLoading: false,
      };
    }
    case ORDER_ACTION_TYPES.RESET_STATE:{
      return{
        isLoading: false,
        isOrderSuccesded: false,
        orderDetails: null,
      };
    }
    default:{
      return state;
    }
  }
};
