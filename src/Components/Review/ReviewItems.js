import React from 'react';

const ReviewItems = (props) => {
          const {name, quantity, seller, key, price} = props.product;
          const reviewItemsStyle={
                    marginLeft: '200px',
                    borderBottom: '1px solid grey',
                    paddingBottom: '10px'

          };
          return (
                    <div style={reviewItemsStyle}>
                              <h3 className="product-name">{name}</h3>
                              <p>Seller : {seller}</p>
                              <p>Quantity : {quantity}</p>
                              <p>Price : {price}</p>
                              <br />
                              <button onClick={() => props.removedProduct(key)} className="main-btn">Remove</button>
                    </div>
          );
};

export default ReviewItems;