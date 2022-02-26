import React from 'react';
import './App.css';
import Header from './component/Header/Header';
import Shop from './component/Shop/Shop';
import { Routes, Route } from "react-router-dom";
import Review from './component/Review/Review';
import Inventory from './component/Inventory/Inventory';
import Nomatch from './Nomatch';
import Productdetails from './component/ProductDetails/Productdetails';

function App() {
  return (
    <div>
    <Header></Header>  
    <Routes>
      <Route path="/" element={<Shop />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/review" element={<Review />} />
      <Route path="/inventory" element={<Inventory/>} />
      <Route path="/product/:key" element={<Productdetails/>} />
      <Route path="*" element={<Nomatch/>} />
    </Routes>
    </div>
  );
}

export default App;
