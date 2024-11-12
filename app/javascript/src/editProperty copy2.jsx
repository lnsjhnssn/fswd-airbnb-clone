import React from "react";
import Layout from "@src/layout";
import { safeCredentials, handleErrors } from "../utils/fetchHelper";

class EditProperty extends React.Component {
  state = {
    title: "",
    description: "",
    city: "",
    country: "",
    property_type: "",
    price_per_night: "",
    max_guests: "",
    bedrooms: "",
    beds: "",
    baths: "",
    loading: true,
    error: null,
  };

  componentDidMount() {
    fetch(`/api/properties/${this.props.property_id}`, safeCredentials())
      .then(handleErrors)
      .then((data) => {
        this.setState({
          ...data.property,
          loading: false,
        });
      });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    fetch(`/api/properties/${this.props.property_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document.querySelector('[name="csrf-token"]').content,
      },
      body: JSON.stringify({
        property: {
          title: this.state.title,
          description: this.state.description,
          city: this.state.city,
          country: this.state.country,
          property_type: this.state.property_type,
          price_per_night: this.state.price_per_night,
          max_guests: this.state.max_guests,
          bedrooms: this.state.bedrooms,
          beds: this.state.beds,
          baths: this.state.baths,
        },
      }),
    })
      .then(handleErrors)
      .then((data) => {
        window.location = `/properties/${this.props.property_id}`;
      })
      .catch((error) => {
        this.setState({
          error: "Could not update property",
        });
      });
  };

  render() {
    const { loading, error } = this.state;

    if (loading) {
      return (
        <Layout>
          <div className="container">
            <h1>Loading...</h1>
          </div>
        </Layout>
      );
    }

    return (
      <Layout>
        <div className="container">
          <h1>Edit Property</h1>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={this.handleSubmit}>
            <div className="form-group mb-3">
              <label>Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={this.state.title}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group mb-3">
              <label>Description</label>
              <textarea
                name="description"
                className="form-control"
                value={this.state.description}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group mb-3">
              <label>City</label>
              <input
                type="text"
                name="city"
                className="form-control"
                value={this.state.city}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group mb-3">
              <label>Country</label>
              <input
                type="text"
                name="country"
                className="form-control"
                value={this.state.country}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group mb-3">
              <label>Property Type</label>
              <input
                type="text"
                name="property_type"
                className="form-control"
                value={this.state.property_type}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group mb-3">
              <label>Price per Night</label>
              <input
                type="number"
                name="price_per_night"
                className="form-control"
                value={this.state.price_per_night}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group mb-3">
              <label>Max Guests</label>
              <input
                type="number"
                name="max_guests"
                className="form-control"
                value={this.state.max_guests}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group mb-3">
              <label>Bedrooms</label>
              <input
                type="number"
                name="bedrooms"
                className="form-control"
                value={this.state.bedrooms}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group mb-3">
              <label>Beds</label>
              <input
                type="number"
                name="beds"
                className="form-control"
                value={this.state.beds}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group mb-3">
              <label>Baths</label>
              <input
                type="number"
                name="baths"
                className="form-control"
                value={this.state.baths}
                onChange={this.handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Update Property
            </button>
          </form>
        </div>
      </Layout>
    );
  }
}

export default EditProperty;
