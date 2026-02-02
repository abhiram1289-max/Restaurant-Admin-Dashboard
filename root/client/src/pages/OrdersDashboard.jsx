import { useEffect, useState } from "react";
import axios from "axios";

export default function OrdersDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("/api/orders").then(res => setOrders(res.data));
  }, []);

  const updateStatus = async (id, status) => {
    const res = await axios.patch(`/api/orders/${id}/status`, { status });
    setOrders(orders.map(o => o._id === id ? res.data : o));
  };

  return (
    <div>
      <h2>Orders</h2>

      {orders.map(order => (
        <div key={order._id}>
          <p>Order #{order.orderNumber}</p>
          <select
            value={order.status}
            onChange={e => updateStatus(order._id, e.target.value)}
          >
            <option>Pending</option>
            <option>Preparing</option>
            <option>Ready</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        </div>
      ))}
    </div>
  );
}
