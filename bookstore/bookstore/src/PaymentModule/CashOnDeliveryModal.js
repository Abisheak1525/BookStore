import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CashOnDeliveryModal.css';
import { Link } from 'react-router-dom';

const CashOnDeliveryModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} dialogClassName="cod-modal">
      <Modal.Body>
        <div>
            <img src='./Tick-transformed.png' alt='order confirmed' className="check-icon"/>
        </div>
        <h3 style={{fontWeight: '600',fontSize: '28px'}}>Your payment is complete.</h3>
        <Link to= '/'>
            <Button className="continue-btn" onClick={handleClose} >CONTINUE SHOPPING</Button>
        </Link>
      </Modal.Body>
    </Modal>
  );
};

export default CashOnDeliveryModal;
