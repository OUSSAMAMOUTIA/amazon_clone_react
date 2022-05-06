import { Link, useNavigate } from "react-router-dom";
import CheckoutProduct from "../../checkout/productCheck/CheckoutProduct.js";
import { useStateValue } from "../../context/StateProvider.js";
import "./Payment.css";
import { CardElement, useStripe, useElements, } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../../helpers/reducer.js";
import axios from "../../helpers/axios.js";
import { db } from "../../helpers/firebase.js";
import { getDatabase} from 'firebase/database';

function Payment() {
  const [{ basket, user },dispatch] = useStateValue();
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState(true);
  useEffect(() => {
        const getClientSecret = async () => {
            const response = await axios({
                method: "post",
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
               })
               setClientSecret(response.data.clientSecret);
               ;}
        getClientSecret();
  }, [basket]);
console.log('====================================');
console.log(clientSecret);
console.log('====================================');
  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(
        clientSecret,
        {
            paymentMethod: {
                card: elements.getCardElement(CardElement),
            }}).then(({ paymentIntent }) => {
                db.collection('users').doc(user?.uid).collection('orders').doc(paymentIntent.id).set({
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created,
                    

                })
                setSucceeded(true);
                setError(null);
                setProcessing(false);
                dispatch({
                    type: "EMPTY_BASKET",
                    basket: [],
                });
                navigate("/orders");
            }
    );
  };
  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  return (
    <div className="payment">
      <div className="payment_container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>){" "}
        </h1>
        <div className="payment_section">
          <div className="payment_title">
            <h3>Delivery address</h3>
          </div>
          <div className="payment_address">
            <p>{user?.email}</p>
            <p>123 Zerktouni</p>
            <p>Agadir, Morocco</p>
          </div>
        </div>
        <div className="payment_section">
          <div className="payment_title">
            <h3>Reviews items and delivery</h3>
          </div>
          <div className="payment_items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        <div className="payment_section">
          <div className="payment_title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment_details">
            <form onSubmit={handleSubmit}>
              <CardElement className="payment_card" 
              onChange={handleChange} />
              <div className="payment_priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <h3>Order Total: {value}</h3>
                    </>
                  )}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                  decimalScale={2}
                />
                <button disabled={disabled || processing || succeeded}>
                  <span>{processing ? <p>processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Payment;
