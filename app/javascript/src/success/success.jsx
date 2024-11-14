import React from "react";
import Layout from "../layout";

const Success = () => {
  console.log("Success");

  return (
    <Layout>
      <div className="container mt-5">
        <div className="card">
          <div className="card-header bg-success text-white">
            <h3 className="mb-0">Your booking is being processed</h3>
          </div>
          <div className="card-body">
            <div className="alert alert-success">
              <p>
                We have received your payment and are finalizing your booking
                details. You will receive a confirmation email shortly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Success;
