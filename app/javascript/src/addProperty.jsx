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
    formData.append("property[title]", e.target.title.value);
    formData.append("property[description]", e.target.description.value);
    formData.append("property[city]", e.target.city.value);
    formData.append("property[country]", e.target.country.value);
    formData.append("property[property_type]", e.target.property_type.value);
    formData.append(
      "property[price_per_night]",
      e.target.price_per_night.value
    );
    formData.append("property[max_guests]", e.target.max_guests.value);
    formData.append("property[bedrooms]", e.target.bedrooms.value);
    formData.append("property[beds]", e.target.beds.value);
    formData.append("property[baths]", e.target.baths.value);

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
      <div>
        <div className="header-container">
          <h2>Add a property</h2>
        </div>
        <div className="card-container">
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
                <option value="Cottage">Cabin</option>
                <option value="Farm">Farm</option>
                <option value="House">House</option>
                <option value="Room">Room</option>
                <option value="Treehouse">Treehouse</option>
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
                className="input-images form-control"
                type="file"
                id="images"
                name="images"
                multiple
                onChange={handleFileChange}
              />
            </div>
            <button
              type="submit"
              className="link-with-background pink btn-add-property"
              disabled={loading}
            >
              {loading ? "Creating..." : "Submit and List your home"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

ReactDOM.render(
  <AddProperty />,
  document.body.appendChild(document.createElement("div"))
);
