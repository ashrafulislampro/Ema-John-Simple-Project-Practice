import Header from "./Components/Headers/Header";
import Shop from "./Components/Shop/Shop";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Inventory from "./Components/Inventory/Inventory";
import Review from "./Components/Review/Review";
import NoFound from "./Components/NoFound/NoFound";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import Shipment from "./Components/Shipment/Shipment";
import Login from "./Components/LoggedIn/Login";
import { createContext, useState } from "react";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
export const UserContext = createContext();

function App() { 
  const [loggedInUser, setLoggedInUser] = useState({});
  const [search, setSearch] = useState('');
  
  const handleSubmit = e => {
    e.preventDefault();
    toggleSpinner(); 
    const products = document.getElementById('product').value;
    setSearch(products);
    document.getElementById('product').value= '';
};
const toggleSpinner = () => {
  const spinner = document.getElementById('spinner_buffer');
  spinner.classList.toggle("d-none");
}

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser], [search, setSearch]}>
    <Router>
     <Header handleSubmit={handleSubmit}></Header>
     <Switch>
       <Route path="/shop">
        <Shop/>
       </Route>
       <Route path="/review">
        <Review/>
       </Route>
       <PrivateRoute path="/inventory">
         <Inventory/>
       </PrivateRoute>
       <Route exact path="/">
         <Shop/>
       </Route>
       <Route path="/product/:productKey">
          <ProductDetails/>
       </Route>
       <PrivateRoute path="/shipment">
         <Shipment/>
       </PrivateRoute>
       <Route path="/login">
         <Login/>
       </Route>
       <Route path="*">
         <NoFound/>
       </Route>
     </Switch>
    </Router>
  </UserContext.Provider>  
  );
}

export default App;
