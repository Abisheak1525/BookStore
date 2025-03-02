import React, { useState } from 'react';
import { Table, Button, Dropdown, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const initialOrders = [
  { invoice: 11199, time: 'Aug 5, 2024 12:45 PM', customer: 'Chandan Yadav', method: 'Cash', amount: '224.95', status: 'Processing' },
  { invoice: 11203, time: 'Aug 5, 2024 11:06 AM', customer: 'sfadf afdf', method: 'Card', amount: '149.94', status: 'Delivered' },
  { invoice: 11205, time: 'Aug 4, 2024 1:14 PM', customer: 'alaa mmmm', method: 'Cash', amount: '342.07', status: 'Delivered' },
  { invoice: 11061, time: 'Aug 4, 2024 1:11 PM', customer: 'mukwaba john baptist', method: 'Cash', amount: '110.00', status: 'Processing' },
  { invoice: 11204, time: 'Aug 4, 2024 11:09 AM', customer: 'alaa mmmm', method: 'Cash', amount: '479.68', status: 'Delivered' },
  { invoice: 11193, time: 'Aug 4, 2024 6:34 AM', customer: 'Mohammed Eldegwy', method: 'Card', amount: '351.29', status: 'Delivered' },
  { invoice: 11040, time: 'Aug 3, 2024 4:08 PM', customer: 'Mohamed Abdinor', method: 'Cash', amount: '210.00', status: 'Cancel' },
  { invoice: 11200, time: 'Aug 3, 2024 4:08 PM', customer: 'Chandan Yadav', method: 'Cash', amount: '210.00', status: 'Delivered' },
];

const statusColor = {
  'Processing': 'text-primary',
  'Delivered': 'text-success',
  'Cancel': 'text-danger'
};

const RecentOrders = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [alertVisible, setAlertVisible] = useState(false);

  const handleStatusChange = (invoice, newStatus) => {
    const updatedOrders = orders.map(order =>
      order.invoice === invoice ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    setAlertVisible(true);
    setTimeout(() => setAlertVisible(false), 2000); // Alert disappears after 3 seconds
  };

  return (
    <div className="order-container mt-5">
      <h3>Recent Orders</h3>
      {alertVisible && <Alert variant="success">Order status updated successfully</Alert>}
      <Table bordered hover>
        <thead>
          <tr>
            <th>INVOICE</th>
            <th>ORDER TIME</th>
            <th>CUSTOMER NAME</th>
            <th>METHOD</th>
            <th>AMOUNT</th>
            <th>STATUS</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{order.invoice}</td>
              <td>{order.time}</td>
              <td>{order.customer}</td>
              <td>{order.method}</td>
              <td>₹{order.amount}</td>
              <td className={statusColor[order.status]}>{order.status}</td>
              <td>
                <Dropdown onSelect={(eventKey) => handleStatusChange(order.invoice, eventKey)}>
                  <Dropdown.Toggle variant="" id="dropdown-basic">
                    {order.status}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item eventKey="Processing">Processing</Dropdown.Item>
                    <Dropdown.Item eventKey="Delivered">Delivered</Dropdown.Item>
                    <Dropdown.Item eventKey="Cancel">Cancel</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default RecentOrders;
