import React, { useContext } from "react";
import "./Header.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
const Header = ({handleSubmit}) => {
  const [setLoggedInUser] = useContext(UserContext);
 
  return (
    <div className="header">
      <img className="logo" src={logo} alt="" />
      <nav>
        <Link to="/shop">Shop</Link>
        <Link to="/review">Order Review</Link>
        <Link to="/inventory">Manage Inventory</Link>
        <button onClick={() => setLoggedInUser({})}>Sign Out</button>
        <div className="pb-2">
          <form onSubmit={handleSubmit} className="d-flex justify-content-center">
          <input
            type="text"
            name="name"
            id="product"
            className="form_control"
            placeholder="Search Product"
          />
          <button className="btn search_btn" type="submit" value="search">Search</button>
          </form>
        </div>
      </nav>
    </div>
  );
};

export default Header;
