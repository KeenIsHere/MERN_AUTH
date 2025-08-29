import {useEffect, useState} from "react";
import Navbar from "../../components/Navbar";
import {useNavigate} from "react-router";
import {baseUrl} from "../../constant";
import Modal from "../../components/Modal";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState(null);

  async function getOrders() {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("token", token);

    const result = await fetch(`${baseUrl}/getOrders.php`, {
      method: "POST",
      body: formData,
    });

    const data = await result.json();

    if (data.success) {
      setOrders(data.data);
    } else {
      toast.error(data.message);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getOrders();
    } else {
      navigate("/login", {
        replace: true,
      });
    }
  }, []);

  return (
    <>
      <Navbar />
      <Modal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title="Update Order Status"
      >
        <form>
          <select
            className="input select"
            value={selectedOrder?.status}
            onChange={(e) =>
              setSelectedOrder({...selectedOrder, status: e.target.value})
            }
          >
            <option value="">Select Status</option>
            <option value="pending">Pending</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </form>
        <button className="button">Update</button>
      </Modal>
      <div className="container">
        <table>
          <thead>
            <tr>
              <th>Action</th>
              <th>Order ID</th>
              <th>Order Date</th>
              <th>Order Status</th>
              <th style={{width: "250px"}}>Delivery Details</th>
              <th style={{width: "300px"}}>Order Items</th>
              <th style={{width: "150px"}}>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr>
                <td>
                  <button
                    style={{
                      padding: "5px",
                      borderRadius: "5px",
                      backgroundColor: "green",
                      border: "none",
                      color: "white",
                      fontSize: "12px",
                      fontWeight: "500",
                      cursor: "pointer",
                    }}
                    onClick={() => setSelectedOrder(order)}
                  >
                    Update Status
                  </button>
                </td>
                <td>{order.order_id}</td>
                <td>{order.created_at}</td>
                <td>
                  <span
                    style={{
                      padding: "5px",
                      borderRadius: "5px",
                      color: "white",
                      fontSize: "12px",
                      fontWeight: "500",
                      backgroundColor:
                        order.status === "pending"
                          ? "orange"
                          : order.status === "delivered"
                          ? "green"
                          : "red",
                    }}
                  >
                    {order.status.toUpperCase()}
                  </span>
                </td>
                <td>
                  <p>{order.delivery_address}</p>
                  <p>{order.contact_number}</p>
                  <p>{order.full_name}</p>
                  <p>{order.email}</p>
                </td>
                <td>
                  {order.orderItems?.map((item) => (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "start",
                        gap: "10px",
                      }}
                    >
                      <img
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "contain",
                          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
                        }}
                        src={`${baseUrl}/${item.image_url}`}
                        alt={item.product_title}
                      />
                      <p
                        style={{
                          margin: "0",
                          display: "flex",
                          flexDirection: "column",
                          gap: "5px",
                        }}
                      >
                        <span style={{fontSize: "14px", fontWeight: "500"}}>
                          {item.product_title}
                        </span>
                        <span style={{fontSize: "12px", color: "gray"}}>
                          Qty: {item.quantity}
                        </span>
                        <span style={{fontSize: "12px", color: "gray"}}>
                          {item.price}
                        </span>
                      </p>
                    </div>
                  ))}
                </td>
                <td>
                  {Number(order.total).toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderPage;
