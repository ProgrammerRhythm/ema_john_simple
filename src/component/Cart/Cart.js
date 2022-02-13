import React from 'react';
import './Cart.css'
const Cart = (props) => {
    const cart = props.cart;
    console.log(cart);
    const totalPrice = cart.reduce((total , prd) => total + prd.price, 0)

    let shiping = 0;
    if(totalPrice>400 || totalPrice>200){
        shiping = 89.99;
    }
    else if(totalPrice>100 || totalPrice>200){
        shiping = 40.99;
    }

    const tax = totalPrice / 12;
    const taxValue = Math.floor(tax);
    return (
        <div className='cart'>
            <h3>Order Summary</h3>
            <p>Items ordered:{cart.length}</p>
            <p><small>Product Price:{totalPrice}</small></p>
            <p><small>Shipping & Handling:{shiping}</small></p>
            <p><small>Tax:{taxValue}</small></p>
            <p>Total Price: {totalPrice+shiping+taxValue}</p>
        </div>
    );
};

export default Cart;