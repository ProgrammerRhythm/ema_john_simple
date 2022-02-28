import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData/products';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItems from '../ReviewItems/ReviewItems';
import { Link } from 'react-router-dom';

const Review = () => {
    const [cart, setCart] = useState([]);
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
    return (
        <div className="shop-container">
            <div className="product-container">
            {
                cart.map(p => <ReviewItems remove={handleRemove} key={p.key} cart={p}></ReviewItems>)
            }
            </div>
            <div className="cart-container">
                 <Cart  cart={cart}>
                 <Link to="/inventory">
                    <button className="main-btn">Order Now</button>
                </Link>
                 </Cart>
            </div>
        </div>
    );  
};

export default Review;