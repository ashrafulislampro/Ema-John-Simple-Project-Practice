import React from 'react';


const Cart = (props) => {
          const cart = props.cart;
          
          const total = cart.reduce((total, pd) => total + pd.price * pd.quantity, 0);
          console.log(total);
          // let total = 0;
          // for (let i = 0; i < cart.length; i++) {
          //           const product = cart[i];
          //           console.log(product.price , product.quantity);
          //           total += product.price * product.quantity;
                    
          // }
          
          let shipping = 0;
          if(total > 35){
                    shipping = 0;
          }
          else if(total > 15){
                    shipping = 4.99;
          }
          else if(total > 0){
                    shipping = 12.99;
          }
          
          const tax = total / 10;
          const grandTotal = total + shipping + Number(tax);

          const formatNumber = num =>{
                    const precision = num.toFixed(2);
                    return Number(precision);
          }

          return (
                    <div>
                              <h2>Order Summery</h2>
                              <br />
                              <p>Items Order : {cart.length}</p>
                              <p>Product Price : {formatNumber(total)}</p>
                              <p>Shipping Cost : {shipping}</p>
                              <p>Tax + VAT : {formatNumber(tax)}</p>
                              <h4>Total Price : {formatNumber(grandTotal)}</h4>
                              {
                                        props.children
                              }
                    </div>
          );
};

export default Cart;