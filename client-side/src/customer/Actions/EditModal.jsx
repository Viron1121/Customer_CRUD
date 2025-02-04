import React from 'react';
import axios, { AxiosError } from "axios";
import Swal from 'sweetalert2';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Modal, Button } from 'react-bootstrap';
import axiosClient from '../../api/axios';

function EditModal( { Added, rowValue, ...props }) {
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
                FirstName: rowValue.FirstName, 
                LastName: rowValue.LastName,
                Email: rowValue.Email,
                ContactNumber: rowValue.ContactNumber,
            }}
            validationSchema={Yup.object({
                FirstName: Yup.string().required('Required'),
                LastName: Yup.string().required('Required'),
                Email: Yup.string().email('Invalid email address').required('Required'),
                ContactNumber: Yup.number().required('Required'),
            })}
            onSubmit={async (values, { resetForm }) => {
                Swal.fire({
                    title: 'Are you sure you want to procced?',
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
                            const result = await axios.put(axiosClient.defaults.baseURL+'/customer/'+rowValue.id, values);
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
                            props.onHide(); // To close the modal
                        } catch (error) {
                            Swal.fire({
                                title: 'Error!',
                                text: error.response.data.message,
                                icon: 'error',
                                iconColor: '#FF0000',
                                confirmButtonText: 'Okay, got it!',
                                customClass: {
                                    confirmButton: "btn btn-primary"
                                },
                                allowOutsideClick: false
                            });
                        }
                    }
                });
            }}
            enableReinitialize
        >
            {({ errors, touched, values }) => (
            <Form placeholder="">
                <Modal.Header closeButton className="bg-light border-0 text-center w-100"> 
                    <h3 className='text-primary'>Edit Customer</h3>
                </Modal.Header>
                <Modal.Body className='bg-muted'>
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
                        <Field type="number" name="ContactNumber" className="form-control" />
                        <ErrorMessage name="ContactNumber" component="div" className="text-danger" />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit">Update</Button>
                </Modal.Footer>
            </Form>
            )}
        </Formik>

    </Modal>
   </>
  )
}

export default EditModal
