import React from 'react';
// import { Link } from 'react-router-dom';
import './Cart.css'
const Cart = (props) => {
    const cart = props.cart;
    // console.log(cart);
    let totalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
        const element = cart[i];
        totalPrice = totalPrice + element.price * element.quantity;
    }
    const total = Math.ceil(totalPrice)
    let shiping = 0;
    if(total>400 || total>200){
        shiping = 89.12;
    }
    else if(total>100 || total>200){
        shiping = 40.03;
    }

    const tax = total / 12;
    const taxValue = Math.floor(tax);
    return (
        <div className='cart'>
            <h3>Order Summary</h3>
            <p>Items ordered:{cart.length}</p>
            <p><small>Product Price:{total}</small></p>
            <p><small>Shipping & Handling:{shiping}</small></p>
            <p><small>Tax:{taxValue}</small></p>
            <p>Total Price: {total+shiping+taxValue}</p>
            <br />
            {
                props.children
            }
        </div>
    );
};

export default Cart;