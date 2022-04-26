import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData/products';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItems from '../ReviewItems/ReviewItems';
// import { Link } from 'react-router-dom';
import order from '../../images/giphy.gif'
import { useNavigate } from 'react-router-dom';
const Review = () => {
    const history = useNavigate();
    const [cart, setCart] = useState([]);
    const [orderedPlaced, SerOrder] = useState(false);
    const handleProceedOrder = () => {
        history('/shipment')
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
                    <button onClick={() => handleProceedOrder()} className="main-btn">Proceed to Order</button>
                 </Cart>
            </div>
        </div>
    );  
};

export default Review;