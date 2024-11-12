import React from "react";
import ReactDOM from "react-dom";
import Layout from "@src/layout";
import { handleErrors } from "../utils/fetchHelper.js";

import "@src/styles/main.scss";

class Home extends React.Component {
  state = {
    properties: [],
    total_pages: null,
    next_page: null,
    loading: true,
    showOnlyMyProperties: false,
    currentUser: null,
  };

  componentDidMount() {
    fetch("/api/authenticated")
      .then(handleErrors)
      .then((data) => {
        this.setState({
          currentUserId: data.user_id,
        });
        console.log(data);
      });

    fetch("/api/properties?page=1")
      .then(handleErrors)
      .then((data) => {
        this.setState({
          properties: data.properties,
          total_pages: data.total_pages,
          next_page: data.next_page,
          loading: false,
        });
        console.log(data);
      });
  }

  toggleMyProperties = () => {
    this.setState((prevState) => ({
      showOnlyMyProperties: !prevState.showOnlyMyProperties,
    }));
  };

  loadMore = () => {
    if (this.state.next_page === null) {
      return;
    }
    this.setState({ loading: true });
    fetch(`/api/properties?page=${this.state.next_page}`)
      .then(handleErrors)
      .then((data) => {
        this.setState({
          properties: this.state.properties.concat(data.properties),
          total_pages: data.total_pages,
          next_page: data.next_page,
          loading: false,
        });
      });
  };

  render() {
    const {
      properties,
      next_page,
      loading,
      currentUserId,
      showOnlyMyProperties,
    } = this.state;

    const filteredProperties =
      showOnlyMyProperties && currentUserId
        ? properties.filter((property) => property.user_id === currentUserId)
        : properties;

    return (
      <Layout>
        <div>
          <div className="home-header">
            <ul>
              <li>
                {currentUserId && (
                  <button onClick={this.toggleMyProperties}>
                    {showOnlyMyProperties
                      ? "Show All Properties"
                      : "Show My Properties"}
                  </button>
                )}
              </li>
              <li>
                <button onClick={this.toggleMyBookings}>My Bookings</button>
              </li>
            </ul>
          </div>
          <div>
            <div className="properties-container">
              {filteredProperties.map((property) => {
                return (
                  <div key={property.id}>
                    <a href={`/property/${property.id}`}>
                      <div
                        className="property-image"
                        style={{
                          backgroundImage: `url(${property.image_url})`,
                        }}
                        role="img"
                        aria-label={property.title}
                      />
                      <p>
                        <small>
                          <b>{property.city}</b>
                        </small>
                      </p>
                      <h6>{property.title}</h6>
                      <p>
                        <small>${property.price_per_night} USD/night</small>
                      </p>
                    </a>
                  </div>
                );
              })}
            </div>
            {loading && <p>loading...</p>}
            {loading || next_page === null || (
              <div>
                <button onClick={this.loadMore}>See more</button>
              </div>
            )}
          </div>
        </div>
      </Layout>
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement("div"))
  );
});
