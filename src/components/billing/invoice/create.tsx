import React, { useEffect, useState } from 'react'
import { Col, Container, Form, Row, Table } from 'react-bootstrap'
import Button from '../../buttons'
import styles from "./invoice.module.css"
import { generateCurrentDateAndTime, generateUniqueId } from '../../../Utilities/Utils'
import { useNavigate } from 'react-router-dom'
import { navigationURL } from '../../../constants'
import axios from 'axios'
import CustomCustomerDropdown from '../../../Utilities/CustomCustomerDropdown.'

const CreateInvoice = () => {
  
  let navigate = useNavigate(); 
  const history = useNavigate();

  const [validated, setValidated] = useState(false);
  const [userList, setUserList] = useState([] as any);
  
  const [createInvoice, setCreateInvoice] = useState({
    currencyType: "",
    paymentMode: "",
    customerName: "",
    invoieStatus: "",
    invoiceParticulars: [] as any,
    grandTotalAmount : "" as any,
    gstNummber: "36AAPCS5625R1ZE",
    panNummber: "BLUPA2358A",
    billingNote: "",
    invoiceNumber: `HB${generateUniqueId()}`,
    createdDate: generateCurrentDateAndTime(),
})

useEffect(() => {
  axios.get('http://localhost:8000/createcustomer').then((res: any) => {
  const customer = res.data;
  setUserList(customer);
});
},[])

const { 
  currencyType, 
  paymentMode, 
  customerName, 
  invoieStatus,
  invoiceParticulars, 
  panNummber, 
  gstNummber, 
  billingNote,  
  createdDate,
  invoiceNumber,
  grandTotalAmount,
} = createInvoice;

const {
  createLead,
  manageLead,
  dashboard,
  customisedItinerary,
  groupItinerary,
  readyItinerary,
  proformainvoice,
  invoice,
  customerView,
} = navigationURL;

const navigateToBack = () => {
  navigate(invoice)
}

const handleChangeCurrency = (e: any) => {
  const target = e.target;

  console.log("target", target)

  const value = target.type === 'checkbox' ? target.checked : target.value;
  const name = target.name;

  setCreateInvoice(
    // {...invoice, [e.target.name]: e.target.value}
    {...createInvoice, [name]: value}
  )
}

const handleSubmit = (event: any) => {
  event.preventDefault(); 
  countGrandTotal()
  const form = event.currentTarget;
  if (form.checkValidity() === false) {
    event.stopPropagation();
    console.log("validattin")
  }  else {
    axios.post(`http://localhost:8000/createinvoice`, createInvoice) 
    console.log("handleSubmit", createInvoice);
  }
  setValidated(true);
//  console.log("grandTotal",grandTotal)
};

const addNewParticular = () => {
  const updatedParticulars = {
    particularName:"",
    particularRate: "",
    particularQuantity: "",
    particularDiscount: "",
    particularHSN: "",
    particularGST: "",
    particularTotalAmount: "",
  }
  setCreateInvoice({...createInvoice, invoiceParticulars: [...createInvoice.invoiceParticulars, updatedParticulars]}); 
}

const deleteParticular = (index: number) => {
  const newParticulars = createInvoice?.invoiceParticulars.filter((_: any, i: any) => i !== index);
  setCreateInvoice({ ...createInvoice, invoiceParticulars: newParticulars });
}


const handleParticularsChange = (index: any, event: any, key: string) => {
  const {name, value} = event.target;

  const newParticulars = [...createInvoice?.invoiceParticulars]; // Create a copy of the particulars array
  newParticulars[index][key] = value; // Update the specified property of the particular object at the specified index
  setCreateInvoice({ ...createInvoice, invoiceParticulars: newParticulars })
  countGrandTotal();
}

const countGrandTotal = () => {
  const particularTotalRate = createInvoice?.invoiceParticulars?.map((item: any) => Number(item.particularRate));
  const particularTotalRateFinalValue = particularTotalRate.reduce((a: any, b: any) => a + b, 0);
  
  const particularTotalQuantity = createInvoice?.invoiceParticulars?.map((item: any) => Number(item.particularQuantity));
  const particularTotalQuantityFinalValue = particularTotalQuantity.reduce((a: any, b: any) => a + b, 0);

  const particularTotalDiscount = createInvoice?.invoiceParticulars?.map((item: any) => Number(item.particularDiscount));
  const particularTotalDiscountFinalValue = particularTotalDiscount.reduce((a: any, b: any) => a + b, 0);

  const particularTotalHSN = createInvoice?.invoiceParticulars?.map((item: any) => Number(item.particularHSN));
  const particularTotalHSNFinalValue = particularTotalHSN.reduce((a: any, b: any) => a + b, 0);

  const particularTotalGST = createInvoice?.invoiceParticulars?.map((item: any) => Number(item.particularGST));
  const particularTotalGSTFinalValue = particularTotalGST.reduce((a: any, b: any) => a + b, 0);

  const particularTotalAmount = createInvoice?.invoiceParticulars?.map((item: any) => Number(item.particularTotalAmount));
  const particularTotalAmountFinalValue = particularTotalAmount.reduce((a: any, b: any) => a + b, 0);

  const findBasicAmount = ((particularTotalRateFinalValue * particularTotalQuantityFinalValue) - particularTotalDiscountFinalValue) + particularTotalHSNFinalValue;
  const calculateGST = findBasicAmount * particularTotalGSTFinalValue / 100;
  const grandTotal = (findBasicAmount + calculateGST) + particularTotalAmountFinalValue
  console.log("findBasicAmount", findBasicAmount, calculateGST, grandTotal  )

  // setGrandTotal(grandTotal);
  setCreateInvoice({ ...createInvoice, grandTotalAmount: grandTotal })
}

  return (
    <div className='manage_top_view'>
       <Container className={styles.invoiceCreateWrapper}>
        <Row>
            <h1>Invoice</h1>
        </Row>
        <Row>
          <div className = {styles.invoiceNumber}>
            <div className={styles.invoiceLogo}>
              <img src="https://s3.ap-south-1.amazonaws.com/tripcontrolimage/upload/user_company_logos/1524478299.jpg" alt="" />
            </div>
            <div className={styles.invoiceDateWrapper}>
              <div>
                <span>Invoice Number</span>
                <h4>{invoiceNumber}</h4>
              </div>
              <div>
                <span>Date of Issue</span>
                <h4>{createdDate}</h4>
              </div>
            </div>
          </div>
        </Row>
        <Row>
          <div className = {styles.titleDetails}>
            <ul className = {styles.addressDetails}>
              <li>Holiday Bazaar</li>
              <li>3rd floor, Nagarjuna Jubilant,</li>
              <li>Himayat Nagar main road, Hyderabad - 500029,</li>
              <li>Telangana, India.</li>
            </ul>
            
            <ul className = {styles.emailDetails}>
              <li>+91 0888 55 13151</li>
              <li>admin@holidaybazaar.co</li>
              <li>http://holidaybazaar.co</li>
            </ul>
        </div>
      </Row>
      <Row>
        <div className={styles.GSTDetailsBlock}>
          <h5>Seller GST Details</h5>
            <ul>
                <li>
                    <label>GSTIN:</label>
                    <span>36AAPCS5625R1ZE</span>
                </li>
                <li>
                    <label>CIN:</label>
                    <span></span>
                </li>
                <li>
                    <label>PAN NO:</label>
                    <span>BLUPA2358A</span>
                </li>
            </ul>
        </div>
      </Row>
      <Row>
        <div className={styles.formWrapper} >
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3 ">
              <Form.Group as={Col} md="3" controlId="validationCustom01">
               
                <Form.Label>Select Customer</Form.Label>
                   
                  <CustomCustomerDropdown required = {true} value = {customerName} onChange = {handleChangeCurrency} name = "customerName" dropdownData = {userList} />
                
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationCustom02">
                <Form.Label>Currency*</Form.Label>
                <Form.Select aria-label="Default select" value={currencyType} onChange={handleChangeCurrency} name="currencyType" required>
                  <option value="">Select Currency...</option>
                  <option value="inr">INR (Indian rupee)</option>
                  <option value="usd">USD (United States dollar)</option>
                  <option value="eur">EUR (European euro)</option>
                  <option value="aud">AUD (Australian dollar)</option>
                  <option value="nzd">NZD (New Zealand dollar)</option>
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationCustom02">
                <Form.Label>Payment Mode*</Form.Label>
                <Form.Select aria-label="Default select"  value={paymentMode} onChange={handleChangeCurrency} name="paymentMode" required>
                  <option value="">Select Payment...</option>
                  <option value="cash">Cash</option>
                  <option value="cheque">Cheque</option>
                  <option value="neft">RTGS / NEFT / IMPS</option>
                  <option value="paymentgateway">Payment Gateway</option> 
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationCustom02">
                <Form.Label>Status*</Form.Label>
                <Form.Select aria-label="Default select" value={invoieStatus} onChange={handleChangeCurrency} name="invoieStatus" required>
                  <option value="">Select Payment...</option>
                  <option value="generated">Generated (Not sent to customer)</option>
                  <option value="senttocustomer">Sent to Customer (Due)</option>
                  <option value="partpaid">Part Paid</option>
                  <option value="fullpaid">Fully Paid</option> 
                  <option value="canceled">Canceled</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Row>
              <div className={styles.tableWrapper}>
                <br />
                <div className={styles.tableContentWrapper}>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Particulars</th>
                      <th>Rate</th>
                      <th>Quantity</th>
                      <th>Discount</th>
                      <th>HSN/SAC</th>
                      <th>GST</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      createInvoice?.invoiceParticulars?.map((item: any, index: any) => <tr key={index}>
                      <td>{index + 1}</td>
                        <td><textarea className={`form-control ${styles.particular_text}`} placeholder="Write your description" name='particularName' value={item.particularName} onChange={(event)=>handleParticularsChange (index, event, "particularName")} /></td>
                        <td><input type="number" className="form-control" placeholder="0.00" name='particularRate' value={item.particularRate} onChange={(event)=>handleParticularsChange (index, event, "particularRate")}/></td>
                        <td><input type="number" className="form-control" placeholder="0.00" name='particularQuantity' value={item.particularQuantity} onChange={(event)=>handleParticularsChange (index, event, "particularQuantity")}/></td>
                        <td><input type="number" className="form-control" placeholder="0.00" name='particularDiscount' value={item.particularDiscount} onChange={(event)=>handleParticularsChange (index, event, "particularDiscount")} /></td>
                        <td><input type="number" className="form-control" placeholder="0.00" name='particularHSN' value={item.particularHSN} onChange={(event)=>handleParticularsChange (index, event, "particularHSN")}/></td>
                        <td><input type="number" className="form-control" placeholder="0.00" name='particularGST' value={item.particularGST} onChange={(event)=>handleParticularsChange (index, event, "particularGST")}/></td>
                        <td><input type="number" className="form-control" placeholder="0.00" name='particularTotalAmount' value={item.particularTotalAmount} onChange={(event)=>handleParticularsChange (index, event, "particularTotalAmount")} /></td>
                        <span  className= {styles.deleteParticular} onClick={() => deleteParticular(index)}>x</span>
                    </tr>)
                    }
                  </tbody>
                </Table>
                </div>
                <div className={styles.addmore}>
                  <button type="button" onClick={addNewParticular}>Add more</button>
                </div>
                <h2 className={styles.grandTotal}>
                  Grand Total: {grandTotalAmount == 0 ? "0.00" : grandTotalAmount}
                </h2>
              </div>
            </Row>
            <Row>
            <Form.Group className="mb-3" controlId="validationCustom10">
              <Form.Label>Billing Note</Form.Label>
              <Form.Control as="textarea" rows={3} value={billingNote} name='billingNote' onChange={handleChangeCurrency} required />
            </Form.Group>
            </Row>
            <Row>
              <div className={styles.actionButtons}> 
                <Button variant="secondary" type="button" onClick={navigateToBack}>Cancel</Button>
                <Button variant="primary" type="submit" className={styles.primaryButton}>Submit</Button>
              </div>
            </Row>
          </Form>
        </div>
      </Row>
    </Container>
    </div>
  )
}

export default CreateInvoice