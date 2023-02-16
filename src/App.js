import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes ,Route } from "react-router-dom";

import Home from "./routes/home/home.component";
import Shop from "./routes/shop/shop.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import PaymentSucceeded from "./routes/payment-succeeded/payment-succeeded.component";
import CheckOut from "./routes/checkout/checkout.component";
import { checkUserSession } from "./store/user/user.action";

const App = () => {

  const dispatch = useDispatch();
    
/*   useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if(user){
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
    });

    return unsubscribe; //close the session of the listener..return is clear function on useEffect
  }, [])
   */
  useEffect(() => {
    dispatch(checkUserSession());
  }, [])

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<CheckOut />} />
        <Route path='payment-succeeded' element={<PaymentSucceeded/>} />
      </Route>
    </Routes>
  ); 
};
export default App;
