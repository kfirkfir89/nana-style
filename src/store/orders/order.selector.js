import { createSelector } from "reselect";

//memoization/cache
//any change in redux store will rerun all the useSelectors in the app
//initial selector to get the data/slice that we need
const selectOrderReducer = (state) => state.order;

export const selectIsLoadingOrder = createSelector(
    //input
    [selectOrderReducer],
    //output the output will run only if the input value change
    (selectOrderReducer) => selectOrderReducer.isLoading
  );

export const selectOrderDetails = createSelector(
    //input
    [selectOrderReducer],
    //output the output will run only if the input value change
    (selectOrderReducer) => selectOrderReducer.orderDetails
  );