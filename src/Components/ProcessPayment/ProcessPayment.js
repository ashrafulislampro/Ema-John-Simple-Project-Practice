import React from "react";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import SimpleCardForm from "./SimpleCardForm";
import SplitCardForm from "./SplitCardForm";

const stripePromise = loadStripe(
  "pk_test_51K5kEtAdRZ9BdaicbTbKEhDLKgBNzKsSlbCIZqENaBnbl94vfRYQwvx6K0FxuOmR5qzPx7WlIJC3OrMo5K47D9sp00oP2stFFd"
);

const ProcessPayment = ({handlePayment}) => {
  return (
    <Elements stripe={stripePromise}>
      <SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>
    </Elements>
  );
};

export default ProcessPayment;
