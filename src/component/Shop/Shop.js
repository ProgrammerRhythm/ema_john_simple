import React, { useEffect, useState } from "react";
import fakeData from "../../fakeData/products";
import { addToDatabaseCart, getDatabaseCart } from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import { Link } from 'react-router-dom';
import Product from "../Product/Product";
import './shop.css'
const Shop = () => {
    const random1 = Math.random()*10;
    const num1 = Math.floor(random1);
    const random2 = Math.random()*100;
    const num2 = Math.ceil(random2);
    const first20 = fakeData.slice(num1,num2);
    const [products, setProducts] = useState(first20)
    const [cart,setCart] = useState([])
    useEffect(() => {
        const saveCart = getDatabaseCart();
        const ProductKeys = Object.keys(saveCart);
        const previousCart = ProductKeys.map(pdkey => {
            const product = fakeData.find(key => key.key === pdkey);
            return product
        })
        setCart(previousCart);
        console.log(previousCart);
    },[])

    const handleAdded = (product) =>{
        const ptb = product.key;
        const sameProduct = cart.find(pd => pd.key === ptb)
        let count = 1;
        let newCart = [];
        if (sameProduct) {
            count = sameProduct.quantity+1;
            sameProduct.quantity = count;
            const other = cart.filter(pd => pd.key !== ptb)
            newCart = [...other,sameProduct]
        }
        else{
            product.quantity = 1;
            newCart = [...cart,product]
        }
        setCart(newCart)
        addToDatabaseCart(product.key, count);
    }
    return (
        <div className="shop-container">

           <div className="product-container">
                
            {
                products.map(product => <Product ShowAddtoCart={true} product={product} handleAdded={handleAdded}></Product>)
            }
                
           </div>
           <div className="cart-container">
               <Cart cart={cart} amnei={setProducts}>
                <Link to="/review">
                    <button className="main-btn">Review Items</button>
                </Link>
               </Cart>
           </div>

           
        </div>
    );
};

export default Shop;