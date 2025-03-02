import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UPIModal.css';

const UPIModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} dialogClassName="upi-modal">
      <Modal.Header closeButton>
        <Modal.Title style={{ color: '#122c6f', fontWeight: '600' }}>UPI Payment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="upi-form">
          <Form>
            <Form.Group controlId="upiQR">
              <img src="/QRCode.jpg" alt="UPI QR Code" className="qr-code" />
            </Form.Group>
            <Form.Group controlId="upiID">
              <Form.Label style={{ marginTop: "8px" }}>UPI ID</Form.Label>
              <Form.Control type="text" placeholder="Enter UPI ID" style={{ width: "100%" }} />
            </Form.Group>
            <Button variant="primary" type="submit" className="upi-submit-btn">
              Make Payment
            </Button>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default UPIModal;
