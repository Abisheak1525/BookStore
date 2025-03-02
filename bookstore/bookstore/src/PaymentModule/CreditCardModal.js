import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CreditCardModal.css';

const CreditCardModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} dialogClassName="credit-card-modal">
      <Modal.Header closeButton>
        <Modal.Title style={{color: '#122c6f', fontWeight: '600'}}>Credit Card Payment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="credit-card-form">
          <Form>
            <Form.Group controlId="cardNumber">
              <Form.Label style={{marginTop: "10px"}}>Card Number</Form.Label>
              <Form.Control type="text" placeholder="Card Number" style={{width: "100%"}}/>
            </Form.Group>
            <Form.Group controlId="cardName">
              <Form.Label style={{marginTop: "10px"}}>Cardholder's Name</Form.Label>
              <Form.Control type="text" placeholder="Cardholder's Name" style={{width: "100%"}}/>
            </Form.Group>
            <div className="form-row">
              <Form.Group controlId="cardExpiry" className="col-md-6">
                <Form.Label style={{marginTop: "10px"}}>Expiration</Form.Label>
                <Form.Control type="text" placeholder="MM/YY" style={{width: "100%"}}/>
              </Form.Group>
              <Form.Group controlId="cardCvv" className="col-md-6">
                <Form.Label style={{marginTop: "10px"}}>CVV</Form.Label>
                <Form.Control type="text" placeholder="CVV" style={{width: "100%"}}/>
              </Form.Group>
            </div>
            <Button variant="primary" type="submit" className="submit-btn">
              Pay Now
            </Button>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CreditCardModal;
