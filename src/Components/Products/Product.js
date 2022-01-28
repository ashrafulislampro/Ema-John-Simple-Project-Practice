import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
const Product = (props) => {
          const {product, handleAddProduct} = props;
          const { name, price, seller, stock, img, key } = product;
          return (
                    <div className="product">
                              <div>
                                        <img className="product_img" src={img} alt="" />
                              </div>
                              <div>
                                        <h3 className="product-name"><Link to={"/product/"+key}>{name}</Link></h3>
                                        <br />
                                        <p>By : {seller}</p>
                                        <p>${price}</p>
                                        <p>Only {stock} left in stock - Order soon</p>
                                        <br />

                                        {props.ShowAddToCard && <button className="main-btn"
                                                  onClick={() => handleAddProduct(props.product)}
                                        >
                                                  <FontAwesomeIcon icon={faShoppingCart} />
                                                   add to cart
                                        </button>}
                              </div>
                    </div>
          );
};

export default Product;