import "./App.css";
import Header from "./component/header/Header.js";
import Home from "./pages/home/Home.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from "./checkout/Checkout.js";
import Login from "./pages/login/Login.js";
import { useEffect } from "react";
import { auth } from "./helpers/firebase.js";
import { useStateValue } from "./context/StateProvider.js";
import Payment from "./pages/payment/Payment.js";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./pages/orders/Orders.js";
const stripePromise = loadStripe(
  "pk_test_51KwOTEDvoRVbwmSqtvK7vuJ97CXfWNVV8IZI8xszuZdXM6QKL0eWWmO2NGZsk9u6AkZsALLj0KGQKuPvcbN78mow00zW29ZiLM"
);
function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      // detaching the listener
      if (user) {
        dispatch({
          type: "SET_USER",
          user: user,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/orders" element={[<Header />, <Orders />]} />

          <Route path="/checkout" element={[<Header />, <Checkout />]} />
          <Route
            path="/payment"
            element={[
              <Header />,
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>,
            ]}
          />
          <Route path="/" element={[<Header />, <Home />]} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
