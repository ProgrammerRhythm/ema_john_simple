import React, { createContext,useState } from 'react';
import './App.css';
import Header from './component/Header/Header';
import Shop from './component/Shop/Shop';
import { Routes, Route } from "react-router-dom";
import Review from './component/Review/Review';
import Inventory from './component/Inventory/Inventory';
import Nomatch from './Nomatch';
import Productdetails from './component/ProductDetails/Productdetails';
import Login from './component/LogIn/Login';
import PrivateRoute from './component/PrivateRoute/PrivateRoute';
import Shipment from './component/Shipment/Shipment';
// import { createContext } from 'react/cjs/react.production.min';

export const UserContext = createContext()

function App() {
  const [login,setLogIn] = useState({});
  return (
    <UserContext.Provider value={[login,setLogIn]}>
    <Header></Header>  
    <h3>Email:{login.email}</h3>
    <Routes>
      <Route path="/" element={<Shop />} />
      <Route path="/shipment" element={
            <PrivateRoute>
              <Shipment />
            </PrivateRoute>
          } />
      <Route path="/login" element={<Login />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/review" element={<Review />} />
      <Route path="/inventory" element={<Inventory/>} />
      <Route path="/product/:key" element={<Productdetails/>} />
      <Route path="*" element={<Nomatch/>} />
    </Routes>
    </UserContext.Provider>
  );
}

export default App;
