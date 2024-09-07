import React, { useEffect, useId, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CustomTextInput from './CustomTextInput';

import Form from 'react-bootstrap/esm/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'; 
import CustomEmailInput from './CustomEmailInput';
import CustomDropdown from './CustomDropdown';
import { selectCountries } from '../constants/countries';
import CustomNumberInput from './CustomNumberInput';
import { generateCurrentDateAndTime, generateUniqueId, onKeyPress } from './Utils';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import CustomToast from './CustomToast';  

export interface NewLead {
  id : string;
  customerFirstName : string;
  customerLastName : string;
  customerEmail : string;
  customerMobile : number;
  country : string;
  state : string;
  city : string;
  zipcode : number;
}

const CreateNewCustomer = (props: any) => {

  const [loading, setLoading] = React.useState(false)
  const [validated, setValidated] = React.useState(false);
  const [statusCode, setStatusCode] = useState("" as any) 
  const [showToast, setshowToast] = useState(false)

  const [createNewCustomer, setCreateNewCustomer ] = React.useState<NewLead>({
    
    customerFirstName: "",
    customerLastName: "",
    customerEmail: "",
    customerMobile: "",
    country: "",
    state: "",
    city: "",
    zipcode: ""
  } as any)

 

  const {
    customerFirstName,
    customerLastName,
    customerEmail,
    customerMobile,
    country,
    state,
    city,
    zipcode
  } = createNewCustomer;

  const handleOnChangeCreateNewCustomer = (e: any) => {
      const target = e.target;
  
      const value = target.value;
      const name = target.name;
    
      console.log("target.value", target.value)

      setCreateNewCustomer({
        ...createNewCustomer,
        [name]: value
      });
  }

  const isButtonDisabled = Object.values(createNewCustomer).some(value => value === '');

  const handleCreateNewCustomer = (event: any) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      console.log("All date Not Verified handleCreateNewCustomer");
      event.stopPropagation();
    } else {
     props?.closeModal(false);
     console.log("createNewCustomer Id : ", createNewCustomer)
      axios.post(`http://localhost:3000/createlead`, JSON.stringify(createNewCustomer),{
        headers: {
          'Content-Type': 'application/json',
        }
      }).then((response) => {
         
      if (response.status === 200) {
        console.log("Manggose api Database status 200:", response.data)
        setStatusCode("success")
        setshowToast(true)
      } else if (response.status === 201) { 
        console.log("Manggose api Database status 201:", response.data)
        setStatusCode("success")
        setshowToast(true)
      } else { 
        console.log("Manggose api Database status success:", response.data)
        setStatusCode("success")
        setshowToast(true)
      }
    }).catch((error) => {
      setStatusCode("danger")
      setshowToast(true)
      console.log("failed with", error)
    })      
    }
     
  }
 
  console.log("Use create customer create colling")

  useEffect(() => {
  
    return () => {
      setshowToast(false)
    }
   }, [])

  return (
    <>
    <CustomToast showToast = {showToast} variantType = {statusCode}/>
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            <h5>Create New Customer</h5>
        </Modal.Title>
      </Modal.Header>
      
        <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleCreateNewCustomer}>
          <Row>
            <Form.Group as={Col} md="4" controlId="validationCustom">
              <Form.Label>Customer First Name</Form.Label>
              <CustomTextInput required = {true} value = {customerFirstName} onChange = {handleOnChangeCreateNewCustomer} name = "customerFirstName" />
            </Form.Group>
            
            <Form.Group as={Col} md="4" controlId="validationCustom">
              <Form.Label>Customer Last Name</Form.Label>
              <CustomTextInput required = {true} value = {customerLastName} onChange = {handleOnChangeCreateNewCustomer} name = "customerLastName" />
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationCustom">
              <Form.Label>Customer Email</Form.Label>
              <CustomEmailInput required = {true} value = {customerEmail} onChange = {handleOnChangeCreateNewCustomer} name = "customerEmail" />
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationCustom">
              <br />
              <Form.Label>Customer Mobile</Form.Label>
              <CustomNumberInput onKeyPress = {onKeyPress} required = {true} value = {customerMobile} onChange = {handleOnChangeCreateNewCustomer} name = "customerMobile" />
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationCustom">
              <br />
              <Form.Label>Country</Form.Label>
              <CustomDropdown placeholder = "Select Country" required = {true} value = {country} onChange = {handleOnChangeCreateNewCustomer} name = "country" dropdownData = {selectCountries} />
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationCustom">
              <br />
              <Form.Label>State</Form.Label>
              <CustomTextInput required = {true} value = {state} onChange = {handleOnChangeCreateNewCustomer} name = "state" />
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationCustom">
              <br />
              <Form.Label>City</Form.Label>
              <CustomTextInput required = {true} value = {city} onChange = {handleOnChangeCreateNewCustomer} name = "city" />
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationCustom">
              <br />
              <Form.Label>Zip code</Form.Label>
              <CustomNumberInput onKeyPress = {onKeyPress} required = {true} value = {zipcode} onChange = {handleOnChangeCreateNewCustomer} name = "zipcode" />
            </Form.Group>
           
          </Row>
          <Row>
            <Form.Group as={Col} md="4">
              <br />
              <Button disabled={isButtonDisabled} className='align-items-center d-flex' onClick={handleCreateNewCustomer}>
                Submit
                </Button>
              <br />
            </Form.Group>
          </Row>
          </Form>
        </Modal.Body>
     
    </Modal>
    </>
  )
}

export default CreateNewCustomer