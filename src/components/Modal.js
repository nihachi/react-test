import React from "react";
import LocationForm from "./LocationForm";
import Modal from "react-bootstrap/Modal";

const ModalForm = ({ show, handleClose, formData, btntext }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Location</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <LocationForm formData={formData} btntext={btntext} />
      </Modal.Body>
    </Modal>
  );
};

export default ModalForm;
