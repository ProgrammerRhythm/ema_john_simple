import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData/products';
import { getDatabaseCart } from '../../utilities/databaseManager';
import ReviewItems from '../ReviewItems/ReviewItems';

const Review = () => {
    const [cart, setCart] = useState([]);
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
        <div> 
            <h1 style={{textAlign: 'center'}}>Cart Product Review</h1>
            {
                cart.map(p => <ReviewItems key={p.key} cart={p}></ReviewItems>)
            }
        </div>
    );  
};

export default Review;