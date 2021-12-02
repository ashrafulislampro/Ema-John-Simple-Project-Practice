import React from "react";
import fakeData from "../../fakeData2";

const Inventory = () => {
  const product = {};
  const handleAddProduct = () => {
    fetch("https://fierce-fjord-93511.herokuapp.com/addProduct", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  return (
    <div>
      <form action="">
          <p><span>Name : </span><input type="text" /></p>
          <p><span>Price : </span><input type="text" /></p>
          <p><span>Quantity : </span><input type="text" /></p>
          <p><span>Upload Image : </span><input type="file" /></p>
        <button onClick={handleAddProduct}>add product</button>
      </form>
    </div>
  );
};

export default Inventory;
