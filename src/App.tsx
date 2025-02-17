import React from 'react';
import CreateLead from './components/lead/create_Lead';
import ManageLead from './components/lead/manage_Lead';
import NavigationBar from './components/navigation/index';
import Suggested from './components/lead/suggested';
import CreateItinerary from './components/itinerary/create_Itinerary';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/dashboard';
import CustomisedItinerary from './components/itinerary/customised_Itinerary';
import GroupItinerary from './components/itinerary/group_Itinerary';
import ReadyItinerary from './components/itinerary/ready_Itinerary';
import Invoice from './components/billing/invoice'; 
import MyCustomer from './components/billing/customer';
import ProformaInvoice from './components/billing/proformaInvoice';
import { navigationURL } from './constants';
import CreateInvoice from './components/billing/invoice/create';
import UpdateCustomer from './components/billing/customer/update';


function App() {
  return (
    // <div className="page"> 
    // <div className="loader"></div>
    // <NavigationBar />
    //     {/* <CreateLead /> */}
    //     {/* <ManageLead /> */}
    //     {/* <Suggested /> */}
    //     <CreateItinerary />
    // </div>

<div className="page">
  <Router>
    <div className="page_header_content">
      <NavigationBar />
    </div>
    {/* <br /><br /><br /><br /><br /> */}
    <div className="page_body_content">
    <Routes>
      <Route path="/" element={<Dashboard />}/>
      <Route path="/lead/create" element={<CreateLead />}/>
      <Route path="/lead/manageLead" element={<ManageLead />}/>
      {/* <Route path="/lead-board/update/:id" element={<UpdateLead />}/> */}
      {/* <Route path="/customer/create" element={<CreateCustomer />}/>
      <Route path="/customer/supervise" element={<SuperviseCustomer />}/>
      
      <Route path="/billing/create" element={<CreateInvoice />}/>
      <Route path="/billing/supervise" element={<SuperviseInvoice />}/>
      <Route path="/billing/update/:id" element={<UpdateInvoice />}/>*/}
      <Route path="/customer" element={<MyCustomer />}/>
      <Route path="/invoice" element={<Invoice />}/>
      <Route path="/invoice/create" element={<CreateInvoice />}/>
      <Route path="/invoice/proforma" element={<ProformaInvoice />}/>
      {/* <Route path={navigationURL.createinvoice} element={<CreateInvoice />}/> */}
      <Route path="/customer/create" element={<MyCustomer />} />
      <Route path="/itinerary/create" element={<CreateItinerary />}/> 
      <Route path="/itinerary/customised" element={<CustomisedItinerary />}/>
      <Route path="/itinerary/group" element={<GroupItinerary />}/>
      <Route path="/itinerary/ready" element={<ReadyItinerary />}/>
      <Route path="/customer/update/:id" element={<UpdateCustomer />}/>
      {/* <Route path="/" element={<Dashboard />}/>
      <Route path="/" element={<Dashboard />}/>
      <Route path="/" element={<Dashboard />}/>
      <Route path="/" element={<Dashboard />}/>
      <Route path="/" element={<Dashboard />}/>
      <Route path="/" element={<Dashboard />}/> */}
      {/* <Route path="/help" element={<Help />}/> */}
    </Routes> 
    </div>
  </Router>
</div>
  );
}

export default App;
