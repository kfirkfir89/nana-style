import { createSelector } from "reselect";

//memoization/cache
//any change in redux store will rerun all the useSelectors in the app
//initial selector to get the data/slice that we need
const selectCategoryReducer = (state) => state.categories;


export const selectCategories = createSelector(
    //input
    [selectCategoryReducer],
    //output the output will run only if the input value change
    (categoriesSlice) => categoriesSlice.categories
  );
  
  export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) => {
    return categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
  }
);