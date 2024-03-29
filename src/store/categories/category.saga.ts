//import { all, call, takeLatest, put } from "redux-saga/effects";
import { all, call, takeLatest, put } from "typed-redux-saga/macro";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

import { featchCategoriesSuccess, featchCategoriesFailed } from "./category.action";

import { CATEGORIES_ACTION_TYPES } from "./category.types";

export function* featchCategoriesAsync() {
  try {
    const categoriesArray = yield* call(getCategoriesAndDocuments);
    //console.log({categoriesArray});
    yield* put(featchCategoriesSuccess(categoriesArray));
  }
  catch (error) {
    yield* put(featchCategoriesFailed(error as Error));
  }
}

export function* onFetchCategories() {
  yield* takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, featchCategoriesAsync);
}

export function* categoriesSaga() {
  yield* all([call(onFetchCategories)]);
}
