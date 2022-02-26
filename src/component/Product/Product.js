import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCartShopping } from '@fortawesome/free-solid-svg-icons'
import './Product.css'
import { Link } from 'react-router-dom';
const Product = (props) => {
    const {name, img, seller, price, stock,key} = props.product;
    return (
        <div className='product'>
            <div className='product-img'>
                <img src={img} alt="" />
            </div>
            <div className='product-details'>
                <h4 className='product-name'><Link to={`/product/${key}`} >{name}</Link></h4>
                <br/>
                <p><small>by:{seller}</small></p>
                <p>${price}</p>
                <p><small>only {stock} left in stock - Order Soon</small></p>
                {props.ShowAddtoCart && <button onClick={() => props.handleAdded(props.product)} className="main-btn"><FontAwesomeIcon icon={faCartShopping} />add to cart</button>}
            </div>
        </div>
    );
};

export default Product;