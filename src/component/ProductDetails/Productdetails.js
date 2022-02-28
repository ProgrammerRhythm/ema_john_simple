import React from 'react';
import { Link, useParams } from 'react-router-dom';
import fakeData from '../../fakeData/products';
import './Productdetails.css'
const Productdetails = () => {
    const {key} = useParams();
    const product = fakeData.find(pd => pd.key === key);
    console.log(product);
    return (
        <div>
          <div className="row">
            <div className="col-3">
                <img className="img" src={product.img} alt="" />
            </div>
            <div className="col-9 title">
                  <h3><small>{product.name}</small></h3>
                  <div className="row">
                    <div className="col-6">
                  <h5><small>Category: {product.category}</small></h5>
                  <h5><small>Product Key: {product.key}</small></h5>
                  <h5><small>WholePrice: {product.wholePrice}</small></h5>
                  <h5><small>Shipping Cost: {product.shipping}</small></h5>
                  </div>
                    <div className="col-6">
                      <h5><small>Seller: {product.seller}</small></h5>
                      <h5><small>StarCount: {product.starCount}</small></h5>
                      <h5><small>Price: {product.price}</small></h5>    
                      <h5><small>Stock: {product.stock}</small></h5>                
                      </div>
                  </div>
                  <Link to="/shop">
                  <button className="main-btn" >Go back</button>
                  </Link>
            </div>
          </div>
        </div>
    );
};

export default Productdetails;