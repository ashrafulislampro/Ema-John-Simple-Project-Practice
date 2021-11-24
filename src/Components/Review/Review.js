import React, { useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import fakeData from '../Shop/fakeData';
import ReviewItems from './ReviewItems';
import happyImage from '../../images/giphy.gif'
import { useHistory } from 'react-router';

const Review = () => {
          const [cart , setCart] = useState([]);
          const [placeOrder, setPlaceOrder] = useState(false);
          let history = useHistory();
         
          const handleProceedCheckOut = () => {
             history.push("/shipment");
            
          }
          
          let thankedYou;
          if(placeOrder) {
             thankedYou = <img src={happyImage} alt=""/>
          }
useEffect(() => {
          // cart
          const savedCart = getDatabaseCart();
          const productKey = Object.keys(savedCart);
          const cartProduct = productKey.map(key => {
                    const product = fakeData.find(pd => pd.key === key);
                    product.quantity = savedCart[key];
                    return product;
          })
          setCart(cartProduct);
},[]);


const removedProduct = productKey => {
          const newCart = cart.filter(pd => pd.key !== productKey);
          setCart(newCart);
          removeFromDatabaseCart(productKey);
}
          return (
                    <div className="twin_container">
                           <div className="products_container">
                              {
                                        cart.map(pd => <ReviewItems removedProduct={removedProduct} product={pd} key={pd.key}></ReviewItems>)
                              }
                              {
                                 thankedYou
                              }
                           </div> 
                           <div className="cart_container">
                                  <Cart cart={cart}>
                                     <button onClick={handleProceedCheckOut} className="main-btn">Proceed CheckOut</button>
                                 </Cart>   
                          </div>  
                    </div>
          );
};

export default Review;