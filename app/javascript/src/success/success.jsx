import React, { useEffect } from "react";
import { safeCredentials, handleErrors } from "../../utils/fetchHelper";

const Success = () => {
  console.log("Success");

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header bg-success text-white">
          <h3 className="mb-0">Payment Successful!</h3>
        </div>
        <div className="card-body">
          <div className="alert alert-success">
            <h4>Thank you for your booking!</h4>
            <p>We have received your payment and your booking is confirmed.</p>
            <p>Check your console to see all booking details.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
