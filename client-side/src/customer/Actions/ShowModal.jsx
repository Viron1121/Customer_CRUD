import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import axiosClient from '../../api/axios';

function ShowModal({rowValue, ...props}) {
  return (
    <>
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
            className="custom-modal"
        >
            <Modal.Header closeButton className="bg-light border-0">
                <h3 className="text-primary">Customer Details</h3>
            </Modal.Header>
            <Modal.Body className="p-4">
                <h5>First Name: <span className="text-muted">{rowValue.FirstName}</span></h5>
                <h5>Last Name: <span className="text-muted">{rowValue.LastName}</span></h5>
                <h5>Email: <span className="text-muted">{rowValue.Email}</span></h5>
                <h5>Contact Number: <span className="text-muted">{rowValue.ContactNumber}</span></h5>
            </Modal.Body>
        </Modal>

    </>
  )
}

export default ShowModal
