import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Layout from "@src/layout";
import { safeCredentials, handleErrors } from "../utils/fetchHelper";

const EditProperty = () => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get property ID from URL (assuming URL pattern: /property/:id/edit)
  const propertyId = window.location.pathname.split("/")[2];

  useEffect(() => {
    // Fetch property data when component mounts
    fetch(
      `/api/properties/${propertyId}`,
      safeCredentials({
        method: "GET",
      })
    )
      .then(handleErrors)
      .then((response) => {
        setProperty(response.property);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [propertyId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(
      `/api/properties/${propertyId}`, // Update endpoint to include property ID
      safeCredentials({
        method: "PUT", // Changed from POST to PUT
        body: JSON.stringify({
          property: {
            title: e.target.title.value,
            description: e.target.description.value,
            city: e.target.city.value,
            country: e.target.country.value,
            property_type: e.target.property_type.value,
            price_per_night: parseFloat(e.target.price_per_night.value),
            max_guests: parseInt(e.target.max_guests.value),
            bedrooms: parseInt(e.target.bedrooms.value),
            beds: parseInt(e.target.beds.value),
            baths: parseFloat(e.target.baths.value),
            image_url: e.target.image_url.value,
          },
        }),
      })
    )
      .then(handleErrors)
      .then((response) => {
        window.location = `/property/${response.property.id}`;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (loading) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container">
        <h1 className="text-center mb-4">Edit Property</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              required
              defaultValue={property?.title}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              required
              defaultValue={property?.description}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              className="form-control"
              required
              defaultValue={property?.city}
            />
          </div>
          <div className="form-group">
            <label htmlFor="country">Country:</label>
            <input
              type="text"
              id="country"
              name="country"
              className="form-control"
              required
              defaultValue={property?.country}
            />
          </div>
          <div className="form-group">
            <label htmlFor="property_type">Property Type:</label>
            <select
              id="property_type"
              name="property_type"
              className="form-control"
              required
              defaultValue={property?.property_type}
            >
              <option value="">Select</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="condo">Condo</option>
              <option value="cabin">Cabin</option>
              <option value="treehouse">Treehouse</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="price_per_night">Price per Night:</label>
            <input
              type="number"
              id="price_per_night"
              name="price_per_night"
              className="form-control"
              required
              defaultValue={property?.price_per_night}
            />
          </div>
          <div className="form-group">
            <label htmlFor="max_guests">Max Guests:</label>
            <input
              type="number"
              id="max_guests"
              name="max_guests"
              className="form-control"
              required
              defaultValue={property?.max_guests}
            />
          </div>
          <div className="form-group">
            <label htmlFor="bedrooms">Bedrooms:</label>
            <input
              type="number"
              id="bedrooms"
              name="bedrooms"
              className="form-control"
              required
              defaultValue={property?.bedrooms}
            />
          </div>
          <div className="form-group">
            <label htmlFor="beds">Beds:</label>
            <input
              type="number"
              id="beds"
              name="beds"
              className="form-control"
              required
              defaultValue={property?.beds}
            />
          </div>
          <div className="form-group">
            <label htmlFor="baths">Baths:</label>
            <input
              type="number"
              id="baths"
              name="baths"
              className="form-control"
              required
              defaultValue={property?.baths}
            />
          </div>
          <div className="form-group">
            <label htmlFor="image_url">Image URL:</label>
            <input
              type="text"
              id="image_url"
              name="image_url"
              className="form-control"
              required
              defaultValue={property?.image_url}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Update Property
          </button>
        </form>
      </div>
    </Layout>
  );
};

ReactDOM.render(
  <EditProperty />,
  document.body.appendChild(document.createElement("div"))
);
