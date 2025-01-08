import React from 'react';
import axios, { AxiosError } from "axios";
import Swal from 'sweetalert2';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Modal, Button } from 'react-bootstrap';
import axiosClient from '../../api/axios';

function CreateModal({ customerData, Added, ...props }) {
  return (
    <>
      <Modal  
          {...props}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          backdrop="static"
      >
        <Formik
          initialValues={{
            FirstName: '',  
            LastName: '',
            Email: '',
            ContactNumber: '',
          }}
          validationSchema={Yup.object({
            FirstName: Yup.string().required('Required'),
            LastName: Yup.string().required('Required'),
            Email: Yup.string()
              .email('Invalid email address')
              .required('Required')
              .test('unique-email', 'Email already exists', function (value) {
                if (!value) return true; 
                return !customerData.some(customer => customer.Email === value);
              }),
            ContactNumber: Yup.string()
              .matches(/^\d+$/, 'Contact number must be numeric')
              .required('Required')
              .test('unique-contact', 'Contact number already exists', function (value) {
                if (!value) return true; 
                return !customerData.some(customer => customer.ContactNumber === value);
              }),
          })}
          onSubmit={async (values, { resetForm }) => {
            Swal.fire({
                title: 'Are you sure you want to proceed?',
                icon: 'warning',
                showCancelButton: true,
                cancelButtonText: 'No, Cancel',
                confirmButtonText: 'Yes, Proceed!',
                reverseButtons: true,
                customClass: {
                    confirmButton: "btn fw-bold btn-primary border border-2 border-primary",
                    cancelButton: "btn fw-bold border border-2 border-primary text-primary bg-transparent",
                },
                allowOutsideClick: false
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const result = await axios.post(axiosClient.defaults.baseURL+'/customer', values);
                        console.log('testing',result);
                        Swal.fire({
                            buttonsStyling: false,
                            title: 'Success!',
                            icon: 'success',
                            iconColor: '#0066C8',
                            confirmButtonText: 'Okay, got it!',
                            customClass: {
                                confirmButton: "btn btn-primary"
                            },
                            allowOutsideClick: false
                        });
                        Added(); // To refetch the data
                        props.onHide();
                    } catch (error) {
                        if (error instanceof AxiosError) {
                            Swal.fire({
                                text: error.response?.data.message,
                                icon: "error",
                                buttonsStyling: false,
                                confirmButtonText: "Ok, got it!",
                                customClass: {
                                    confirmButton: "btn btn-primary"
                                },
                                allowOutsideClick: false
                            });
                        }
                    }
                }
            });
        }}
        >
          {({ values }) => (
            <Form>
              <Modal.Header closeButton>
                <h3 className='text-primary'>Add Customer</h3>
              </Modal.Header>
              <Modal.Body className="bg-muted">
                {/* First Name Field */}
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label required">First Name</label>
                  <Field type="text" name="FirstName" className="form-control" />
                  <ErrorMessage name="FirstName" component="div" className="text-danger" />
                </div>

                {/* Last Name Field */}
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">Last Name</label>
                  <Field type="text" name="LastName" className="form-control" />
                  <ErrorMessage name="LastName" component="div" className="text-danger" />
                </div>

                {/* Email Address Field */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <Field type="email" name="Email" className="form-control" />
                  <ErrorMessage name="Email" component="div" className="text-danger" />
                </div>

                {/* Contact Number Field */}
                <div className="mb-3">
                  <label htmlFor="contactNumber" className="form-label">Contact Number</label>
                  <Field type="text" name="ContactNumber" className="form-control" />
                  <ErrorMessage name="ContactNumber" component="div" className="text-danger" />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <button
                    data-bs-dismiss="modal"
                    type="submit"
                    className="btn btn-sm btn-primary border border-2 border-primary "
                >
                    Submit
                </button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
}

export default CreateModal;
