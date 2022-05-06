import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../../context/StateProvider.js";
import { getBasketTotal } from "../../helpers/reducer.js";
import { useNavigate } from "react-router-dom";

import "./Subtotal.css";
function Subtotal() {
  const [{basket}]=useStateValue();
  const navigate = useNavigate();

  return (
    <div className="subtotal">
      <CurrencyFormat
      renderText={(value) => (
          <>
            <p>Subtotal ({basket.length} items):
              <strong>{` ${value}`}</strong>
            </p>
            <small className="subtotal_gift">
              <input type="checkbox" />
              This order contains a gift
            </small>
          </>
        )}
        value={getBasketTotal(basket)}    
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
        decimalScale={2}
        
      />
        <button onClick={(e)=>navigate("/payment")}>Proceed to Checkout</button>
    </div>
  );
}
export default Subtotal;
