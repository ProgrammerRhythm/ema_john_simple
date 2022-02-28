import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData/products';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItems from '../ReviewItems/ReviewItems';
// import { Link } from 'react-router-dom';
import order from '../../images/giphy.gif'
const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderedPlaced, SerOrder] = useState(false);
    const handlePlaceOrder = () => {
        setCart([])
        SerOrder(true)
        processOrder()
        
    }
    const handleRemove = (key) => {
         console.log(key);
         const newCart = cart.filter(pd => pd.key !== key)
         setCart(newCart)
         removeFromDatabaseCart(key)
    }
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProduct = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        // console.log(cartProduct);
        setCart(cartProduct);
    },[])
    let thank;
    if(orderedPlaced){
        thank = <img src={order} alt="" />;
    } 
    return (
        <div className="shop-container">
            <div className="product-container">
            {
                cart.map(p => <ReviewItems remove={handleRemove} key={p.key} cart={p}></ReviewItems>)
            }
            {thank}
            </div>
            <div className="cart-container">
                 <Cart  cart={cart}>
                    <button onClick={() => handlePlaceOrder()} className="main-btn">Order Now</button>
                 </Cart>
            </div>
        </div>
    );  
};

export default Review;