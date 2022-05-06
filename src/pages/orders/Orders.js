import { useEffect, useState } from "react";
import Order from "../../component/order/Order.js";
import { useStateValue } from "../../context/StateProvider.js";
import { db } from "../../helpers/firebase.js";
import "./Orders.css";
function Orders() {
  const [orders, setOrders] = useState([]);
  const [{ basket, user }, dispatch] = useStateValue();

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
              created: doc.data().created,
            }))
          );
        });
    } else {
      setOrders([]);
    }
  }, []);
  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="orders_orders">
        {orders.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  );
}
export default Orders;
