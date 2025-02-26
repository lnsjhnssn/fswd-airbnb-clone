import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Layout from "@src/layout";
import { fetchProperty, updateProperty } from "../utils/api";

const EditProperty = () => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  const propertyId = window.location.pathname.split("/")[2];

  useEffect(() => {
    const loadProperty = async () => {
      try {
        const data = await fetchProperty(propertyId);
        setProperty(data.property);
        setExistingImages(data.property.images || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadProperty();
  }, [propertyId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    images.forEach((image) => {
      formData.append("property[images][]", image);
    });

    try {
      const response = await updateProperty(propertyId, formData);
      window.location = `/property/${response.property.id}`;
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e) => {
    setImages(Array.from(e.target.files));
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
            <label>Current Images:</label>
            <div className="existing-images">
              {existingImages.map((image, index) => (
                <div key={index} className="image-preview">
                  <img src={image.url} alt={`Property image ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="images">Change Images:</label>
            <input
              type="file"
              id="images"
              name="images"
              className="form-control"
              multiple
              onChange={handleFileChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Update Property
          </button>
        </form>
        <div>
          <button
            onClick={() => (window.location.href = "/hosting")}
            className="btn-nav"
          >
            Go back to hosting page
          </button>
        </div>
      </div>
    </Layout>
  );
};

ReactDOM.render(
  <EditProperty />,
  document.body.appendChild(document.createElement("div"))
);
