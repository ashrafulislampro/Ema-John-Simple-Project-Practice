import React from 'react';
import { useParams } from 'react-router';
import Product from '../Products/Product';
import fakeData from '../Shop/fakeData';
const ProductDetails = () => {
          const {productKey} = useParams();
          const product = fakeData.find(pd => pd.key === productKey);
          console.log(product);
          return (
                    <div>
                              <h1>The product Details</h1>
                              <Product ShowAddToCard={false} product={product}></Product>

                    </div>
          );
};

export default ProductDetails;