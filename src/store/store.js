import { legacy_createStore as createStore } from "redux";
import { compose, applyMiddleware } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage";

import { rootReducer } from "./root-reducer";



const loggerMiddleware = (store) => (next) => (action) => {
  if(!action.type){
    return next(action);
  }

  console.log("%c TYPE: ", "color: #dc2626; font-weight: bold; background-color: #e5e7eb; border-radius: 2px; border: 2px solid #a1a1aa;", action.type);
  console.log("%cPAYLOAD: ", "color: #dc2626; font-weight: bold; ", action.payload);
  console.log("%cCURRENT: ", "color: #2563eb; font-weight: bold; ", store.getState());


  next(action);

  console.log("%c NEXT: ", "color: #2563eb; font-weight: bold; background-color: #e5e7eb; border-radius: 2px; border: 2px solid #22c55e;", store.getState());
};

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [loggerMiddleware];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);
