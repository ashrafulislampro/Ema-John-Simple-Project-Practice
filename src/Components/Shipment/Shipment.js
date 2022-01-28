import React, { useContext , useState} from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../App";
import { getDatabaseCart, processOrder } from "../../utilities/databaseManager";
import ProcessPayment from "../ProcessPayment/ProcessPayment";
import "./Shipment.css";

const Shipment = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
   const [shipmentData, setShipmentData] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
   setShipmentData(data);
  };

  const handlePaymentSuccess = (paymentId) => {
    const savedCart = getDatabaseCart();
    const productDetails = {
      ...loggedInUser,
      products: savedCart,
      shipment: shipmentData,
      paymentId,
      orderTime: new Date(),
    };
    fetch("https://fierce-fjord-93511.herokuapp.com/addOrder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          processOrder();
          alert("Your order place successfully");
        }
      });
  }
  return (
    <div className="row">
      <div style={{display : shipmentData ? "none" : "block"}} className="col-md-6">
        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
          <input
            defaultValue={loggedInUser.name}
            {...register("name", { required: true })}
            placeholder="Your Name"
          />
          {errors.name && <span className="error">Name is required</span>}

          <input
            defaultValue={loggedInUser.email}
            {...register("email", { required: true })}
            placeholder="Your Email"
          />
          {errors.email && <span className="error">Email is required</span>}

          <input
            {...register("phone", { required: true })}
            placeholder="Your Phone"
          />
          {errors.phone && <span className="error">Phone is required</span>}

          <input
            {...register("address", { required: true })}
            placeholder="Your Address"
          />
          {errors.address && <span className="error">Address is required</span>}

          <input type="submit" className="submit" value="Submit" />
        </form>
      </div>
      <div style={{display : shipmentData ? "block" : "none"}} className="col-md-6">
        <h1 className="mt-5">Pay With Card</h1>
        <ProcessPayment handlePayment={handlePaymentSuccess}></ProcessPayment>
      </div>
    </div>
  );
};

export default Shipment;
