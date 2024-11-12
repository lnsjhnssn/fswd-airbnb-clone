import React from "react";
import Layout from "@src/layout";
import BookingWidget from "./bookingWidget";
import { handleErrors } from "../../utils/fetchHelper";

import "./property.scss";

class Property extends React.Component {
  state = {
    property: {},
    loading: true,
    currentUser: null,
  };

  componentDidMount() {
    fetch(`/api/properties/${this.props.property_id}`)
      .then(handleErrors)
      .then((data) => {
        this.setState({
          property: data.property,
          loading: false,
        });
      });

    fetch(`/api/properties/`)
      .then(handleErrors)
      .then((data) => {
        console.log(data);
      });

    fetch("/api/authenticated")
      .then(handleErrors)
      .then((data) => {
        if (data.authenticated) {
          this.setState({
            currentUser: data.username,
          });
        }
      });
  }

  render() {
    const { property, loading, currentUser } = this.state;
    if (loading) {
      return <p>loading...</p>;
    }

    const {
      id,
      title,
      description,
      city,
      country,
      property_type,
      price_per_night,
      max_guests,
      bedrooms,
      beds,
      baths,
      image_url,
      user,
    } = property;

    const isHost = currentUser && user && currentUser === user.username;

    return (
      <Layout>
        <div className="property-container">
          <div className="property-hero">
            <img src={image_url} alt={title} />
          </div>

          <div className="property-content">
            <div className="property-header">
              <div>
                <h3>{title}</h3>
                <p>
                  <b>
                    {property_type} in {city}, {country}
                  </b>
                </p>
                <div className="property-specs">
                  <ul>
                    <li>{max_guests} guests</li>
                    <li>{bedrooms} bedroom</li>
                    <li>{beds} bed</li>
                    <li>{baths} bath</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid-container">
              <div className="grid-1">
                <div className="property-host">
                  <p>
                    Hosted by <b>{user.username}</b>
                  </p>
                </div>

                <div className="property-description">
                  <p>{description}</p>
                </div>
                {isHost && (
                  <button
                    onClick={() =>
                      (window.location.href = `/edit-property/${id}`)
                    }
                    className="btn-edit-property"
                  >
                    Edit Property
                  </button>
                )}
              </div>
              <div className="grid-2">
                <BookingWidget
                  property_id={id}
                  price_per_night={price_per_night}
                />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Property;
