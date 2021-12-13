import React, { useEffect, useState } from 'react';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager.js';
import Cart from '../Cart/Cart.js';
import Product from '../Products/Product.js';
import { Link } from 'react-router-dom';
import './Shop.css';

const Shop = () => {
   const [products, setProducts] = useState([]);
   const [cart, setCart] = useState([]);
   const [searchProduct, setSearchProduct] = useState('');
   useEffect(() => {
      fetch('https://fierce-fjord-93511.herokuapp.com/products?search='+searchProduct)
         .then(res => res.json())
         .then(data => setProducts(data));
   }, [searchProduct]);

   const handleBlur = (event) => {
      setSearchProduct(event.target.value);
   }
   
   useEffect(() => {
      const savedCart = getDatabaseCart();
      const productKey = Object.keys(savedCart);
     
      fetch('https://fierce-fjord-93511.herokuapp.com/productsByKeys', {
             method : "POST",
             headers : {"Content-Type": "application/json"},
             body : JSON.stringify(productKey)
          })
          .then(res => res.json())
          .then(data => setCart(data))
   }, []);

 
   const handleAddProduct = (product) => {
      const toBeAddedKey = product.key;
      const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
      let count = 1;
      let newCart;
      if (sameProduct) {
         count = sameProduct.quantity + 1;
         sameProduct.quantity = count;
         const others = cart.filter(pd => pd.key !== toBeAddedKey);
         newCart = [...others, sameProduct];
      }
      else {
         product.quantity = 1;
         newCart = [...cart, product];
      }
      setCart(newCart);
      addToDatabaseCart(product.key, count);
   }
   return (
      <div className="twin_container">
         
         <div className="products_container">
         <input type="text" placeholder="Search Product" onBlur={handleBlur}/>
            {
               products.map(pd => <Product
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