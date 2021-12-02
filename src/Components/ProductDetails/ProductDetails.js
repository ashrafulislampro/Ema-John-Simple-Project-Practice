import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Product from '../Products/Product';
const ProductDetails = () => {
          const {productKey} = useParams();
          const [product, setProduct] = useState({});
          useEffect(() => {
                    fetch('https://fierce-fjord-93511.herokuapp.com/product/'+ productKey)
                    .then(res => res.json())
                    .then(data => setProduct(data))
          },[productKey]);
          return (
                    <div>
                              <h1>The product Details</h1>
                              <Product ShowAddToCard={false} product={product}></Product>

                    </div>
          );
};

export default ProductDetails;