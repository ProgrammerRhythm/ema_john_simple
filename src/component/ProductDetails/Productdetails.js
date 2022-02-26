import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData/products';
import Product from '../Product/Product';

const Productdetails = () => {
    const {key} = useParams();
    const product = fakeData.find(pd => pd.key === key);
    console.log(product);
    return (
        <div>
          <Product ShowAddtoCart={false} product={product}></Product>
        </div>
    );
};

export default Productdetails;