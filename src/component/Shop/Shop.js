import React, { useState } from "react";
import fakeData from "../../fakeData/products";
import Cart from "../Cart/Cart";
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
    const handleAdded = (product) =>{
        console.log('Product Added', product);
        const newCart = [...cart, product]
        setCart(newCart)
    }
    return (
        <div className="shop-container">

           <div className="product-container">
                
            {
                products.map(product => <Product product={product} handleAdded={handleAdded}></Product>)
            }
                
           </div>
           <div className="cart-container">
               <Cart cart={cart} amnei={setProducts}></Cart>
           </div>

           
        </div>
    );
};

export default Shop;