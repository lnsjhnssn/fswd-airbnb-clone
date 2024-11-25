import React, { useState } from "react";
import ReactDOM from "react-dom";
import Layout from "@src/layout";
import { createProperty } from "../utils/api";

const AddProperty = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);

  const handleFileChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("property[title]", "8");
    formData.append("property[description]", "8");
    formData.append("property[city]", "8");
    formData.append("property[country]", "8");
    formData.append("property[property_type]", "house");
    formData.append("property[price_per_night]", "8");
    formData.append("property[max_guests]", "8");
    formData.append("property[bedrooms]", "8");
    formData.append("property[beds]", "8");
    formData.append("property[baths]", "8");

    images.forEach((image, index) => {
      formData.append(`property[images][]`, image);
    });

    try {
      const response = await createProperty(formData);
      window.location = `/property/${response.property.id}`;
    } catch (error) {
      console.error("Error creating property:", error);
      setError("Failed to create property. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container">
        <h1 className="text-center mb-4">Become a host</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              required
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
            />
          </div>
          <div className="form-group">
            <label htmlFor="property_type">Property Type:</label>
            <select
              id="property_type"
              name="property_type"
              className="form-control"
              required
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
            />
          </div>
          <div className="form-group">
            <label htmlFor="images">Images:</label>
            <input
              type="file"
              id="images"
              name="images"
              className="form-control"
              multiple
              onChange={handleFileChange}
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Creating..." : "List your home"}
          </button>
        </form>
      </div>
    </Layout>
  );
};

ReactDOM.render(
  <AddProperty />,
  document.body.appendChild(document.createElement("div"))
);
