import React from "react";
import { useContext, useState, useEffect } from "react";
import moment from "moment";

import Table from "react-bootstrap/Table";

import UserContext from "../contexts/UserContext";

export default function Order() {
  const userContext = useContext(UserContext);

  //state
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  

  useEffect(() => {
    (async () => {
      // Refresh token
      const valid = await userContext.refreshToken();
      if (!valid) {
        return;
      }

      const response = await userContext.getOrder();

      setOrders(response);
      setLoading(true);
    })();
  }, []);

  console.log(orders);

  //param = (the url we want to link to ,_blank is default ,)
  const openNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <React.Fragment>
      {loading ? (
        <div className="container py-5">
          <Table striped hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Order Date</th>
                <th>Amount</th>
                <th>Shipping</th>
                <th>Shipping Address</th>
                <th>Status</th>
                <th>Delivery Date</th>
                <th>Receipt</th>
              </tr>
            </thead>
            <tbody>
              {orders.length ? (
                orders.map((each) => {
                  return (
                    <tr key={each.id}>
                      <td>{each.id}</td>
                      <td>{moment(each.order_date).format("YYYY-MM-DD")}</td>
                      <td>$ {(each.total_amount / 100).toFixed(2)}</td>
                      <td>{each.shipping_type}</td>
                      <td>
                        {each.shipping_address_line1}
                        <br />
                        {each.shipping_address_line2}
                        <br />
                        {each.shipping_postal_code}
                        <br />
                        {each.shipping_country}
                      </td>
                      <td>
                        {each.orderStatus.order_status}
                        <br />
                      </td>

                      {each.delivery_date === null ? (
                        <td>Pending</td>
                      ) : (
                        <td>
                          {" "}
                          {moment(each.delivery_date).format("YYYY-MM-DD")}
                        </td>
                        
                      )}

                      <td>
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => openNewTab(each.receipt_url)}
                        >
                          Receipt
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <h1>gaga</h1>
              )}
            </tbody>
          </Table>
        </div>
      ) : (
        <div className="container adjust-margin-top pt-5">
          <h1>Orders</h1>
          <div className="container mt-3 mt-md-4">
            <h1>LOADING SPINNNNERRR</h1>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
