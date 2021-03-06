import React, { useContext, useEffect, useState } from "react";
import {
  addToDatabaseCart,
  getDatabaseCart,
} from "../../utilities/databaseManager.js";
import Cart from "../Cart/Cart.js";
import Product from "../Products/Product.js";
import { Link } from "react-router-dom";
import "./Shop.css";
import fakeData from "./fakeData.js";
import { UserContext } from "../../App.js";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useContext(UserContext);
  useEffect(() => {
    fetch("https://fierce-fjord-93511.herokuapp.com/products?search=" + search)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          toggleSpinner();
          setProducts(data);
        }
      });
  }, [search]);
  const toggleSpinner = () => {
    const spinner = document.getElementById("spinner_buffer");
    spinner.classList.toggle("d-none");
  };
  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKey = Object.keys(savedCart);
    const cartProducts = productKey.map((existingKey) => {
      const product = fakeData.find((pd) => pd.key === existingKey);
      product.quantity = savedCart[existingKey];

      return product;
    });
    setCart(cartProducts);
    // fetch('https://fierce-fjord-93511.herokuapp.com/productsByKeys', {
    //        method : "POST",
    //        headers : {"Content-Type": "application/json"},
    //        body : JSON.stringify(productKey)
    //     })
    //     .then(res => res.json())
    //     .then(data => setCart(data))
  }, []);

  const handleAddProduct = (product) => {
    const toBeAddedKey = product.key;
    const sameProduct = cart.find((pd) => pd.key === toBeAddedKey);
    let count = 1;
    let newCart;
    if (sameProduct) {
      count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      const others = cart.filter((pd) => pd.key !== toBeAddedKey);
      newCart = [...others, sameProduct];
    } else {
      product.quantity = 1;
      newCart = [...cart, product];
    }
    setCart(newCart);
    addToDatabaseCart(product.key, count);
  };

  return (
    <div className="container-fluid twin_container">
      <div className="row row-content">
        <div className="col-sm-12 col-md-12 col-lg-9">
          <div className="products_container">
            <div
              id="spinner_buffer"
              className="d-done d-flex justify-content-center mt-5"
            >
              <div className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>

            {products.map((pd) => (
              <Product
                product={pd}
                ShowAddToCard={true}
                key={pd.key}
                handleAddProduct={handleAddProduct}
              ></Product>
            ))}
          </div>
        </div>
        <div className="col-sm-12 col-md-12 col-lg-2">
          <div className="cart_container">
            <Cart cart={cart}>
              <Link to="/review">
                <button className="main-btn">Review Order</button>
              </Link>
            </Cart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
