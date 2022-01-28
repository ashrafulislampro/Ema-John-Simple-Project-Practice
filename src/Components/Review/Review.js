import React, { useEffect, useState } from "react";
import {
  getDatabaseCart,
  processOrder,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import ReviewItems from "./ReviewItems";
import happyImage from "../../images/giphy.gif";
import { useHistory } from "react-router";
import fakeData from "../Shop/fakeData";

const Review = () => {
  const [cart, setCart] = useState([]);
  const [placeOrder, setPlaceOrder] = useState(false);
  let history = useHistory();

  const handleProceedCheckOut = () => {
    history.push("/shipment");
  };

  let thankedYou;
  if (placeOrder) {
    thankedYou = <img src={happyImage} alt="" />;
  }
  useEffect(() => {
    // cart
    const savedCart = getDatabaseCart();
    const productKey = Object.keys(savedCart);
    const cartProducts = productKey.map((existingKey) => {
      const product = fakeData.find((pd) => pd.key === existingKey);
      product.quantity = savedCart[existingKey];

      return product;
    });
    setCart(cartProducts);
    //  fetch('https://fierce-fjord-93511.herokuapp.com/productsByKeys', {
    //     method : "POST",
    //     headers : {"Content-Type": "application/json"},
    //     body : JSON.stringify(productKey)
    //  })
    //  .then(res => res.json())
    //  .then(data => setCart(data))
  }, []);

  const removedProduct = (productKey) => {
    const newCart = cart.filter((pd) => pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  };
  return (
    <div className="container-fluid twin_container">
    <div className="row">
      <div className="col-sm-12 col-md-12 col-lg-9 products_container">
        {cart.map((pd) => (
          <ReviewItems
            removedProduct={removedProduct}
            product={pd}
            key={pd.key}
          ></ReviewItems>
        ))}
        {thankedYou}
      </div>
      <div className="col-sm-12 col-md-12 col-lg-3 cart_container">
        <Cart cart={cart}>
          <button onClick={handleProceedCheckOut} className="main-btn">
            Proceed CheckOut
          </button>
        </Cart>
      </div>
    </div>
    </div>
  );
};

export default Review;
