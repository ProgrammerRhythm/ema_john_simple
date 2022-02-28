import React from 'react';

const ReviewItems = (props) => {
    console.log(props.cart);
    const remove = props.remove;
    const {name,price,quantity,key} = props.cart;
    return (
        <div style={{border: '1px solid gray',margin: '15px', padding: '20px', borderRadius: '15px',}}>
           <h4 className="product-name"><small>{name}</small></h4>
           <p>Quantity : {quantity}</p>
           <p>Price : {price}</p>
           <br />
           <button onClick={() => remove(key)} className="main-btn">Remove</button>
        </div>
    );
};

export default ReviewItems;