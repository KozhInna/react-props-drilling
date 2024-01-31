import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getDataRedux, reduxHandleUpdate } from "../store/dataSlice";

const ComponentC = (props) => {
  const { data, url } = props; //1
  const dispatch = useDispatch();
  const [orders, setOrders] = useState(data?.orders);

  useEffect(() => {
    setOrders(data?.orders);
  }, [data]);

  const handleChange = (orderIndex, field) => (event) => {
    const newOrders = orders.map((order, index) => {
      index === orderIndex ? { ...order, [field]: event.target.value } : order;
    });

    setOrders(newOrders);
  };

  const handleUpdate = () => {
    dispatch(reduxHandleUpdate({ ...data, orders })).then(() => {
      dispatch(getDataRedux(url));
    });
  };

  return (
    <div>
      <h1>Component C</h1>
      <div>
        <h2>{data?.name}</h2>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          {orders?.map((order, orderIndex) => (
            <div
              key={orderIndex}
              style={{ display: "flex", flexDirection: "column", margin: 10 }}
            >
              <TextField
                label="Order ID"
                value={order.orderId}
                onChange={handleChange(orderIndex, "orderId")}
              />
              <TextField
                label="Product"
                value={order.product}
                onChange={handleChange(orderIndex, "product")}
              />
              <TextField
                label="Quantity"
                value={order.quantity}
                onChange={handleChange(orderIndex, "quantity")}
              />
              <TextField
                label="Price"
                value={order.price}
                onChange={handleChange(orderIndex, "price")}
              />
            </div>
          ))}
        </div>
        <Button variant="contained" color="primary" onClick={handleUpdate}>
          Update
        </Button>
      </div>
    </div>
  );
};

export default ComponentC;
