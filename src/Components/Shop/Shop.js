import React, { useEffect, useState } from 'react';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager.js';
import Cart from '../Cart/Cart.js';
import Product from '../Products/Product.js';
// import fakeData from './fakeData.js';
import fakeData2 from '../../fakeData2'
import { Link } from 'react-router-dom';
import './Shop.css';

const Shop = () => {
          const first10 = fakeData2.slice(0, 10);
          const [products, setProducts] = useState(first10);
          const [cart, setCart] = useState([]);

         useEffect(() =>{
            const savedCart = getDatabaseCart();
            const productKey = Object.keys(savedCart);
            const previousProduct = productKey.map(pdKey =>{
               const product = fakeData2.find(pd => pd.key === pdKey);
               product.quantity = savedCart[pdKey];
               return product;
            })
            setCart(previousProduct);
         },[])


          const handleAddProduct = (product) =>{
            const toBeAddedKey = product.key;
            const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
            let count = 1;
            let newCart;
            if(sameProduct){
               count = sameProduct.quantity + 1;
               sameProduct.quantity = count;
               const others = cart.filter(pd => pd.key !== toBeAddedKey);
               newCart = [...others, sameProduct];
            }
            else{
               product.quantity = 1;
               newCart = [...cart, product];
            }
            setCart(newCart);
            addToDatabaseCart(product.key, count);
          }
          return (
                    <div className="twin_container">
                           <div className="products_container">
                              {
                                       products.map(pd =><Product 
                                           product={pd}
                                           ShowAddToCard={true}
                                           key={pd.key}
                                           handleAddProduct={handleAddProduct}
                                           ></Product>)
                              }
                           </div> 
                           <div className="cart_container">
                              <Cart cart={cart}>
                                 <Link to="/review">
                                          <button className="main-btn">Review Order</button>
                                 </Link>
                              </Cart>
                           </div>  
                    </div>
          );
};

export default Shop;