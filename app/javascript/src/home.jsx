import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Layout from "@src/layout";
import {
  fetchAuthenticatedUser,
  fetchPropertiesWithPagination,
} from "../utils/api";

import "@src/styles/main.scss";

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showOnlyMyProperties, setShowOnlyMyProperties] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Load properties first so guests can see them
        const propertyData = await fetchPropertiesWithPagination(1);
        setProperties(propertyData.properties);
        setTotalPages(propertyData.total_pages);
        setNextPage(propertyData.next_page);

        // Then try to get user data if they're logged in
        try {
          const userData = await fetchAuthenticatedUser();
          setCurrentUserId(userData.user_id);
        } catch (error) {
          // User is not authenticated - that's okay
          console.log("User not authenticated");
        }
      } catch (error) {
        console.error("Error loading properties:", error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const toggleMyProperties = () => {
    setShowOnlyMyProperties((prev) => !prev);
  };

  const loadMore = async () => {
    if (!nextPage) return;

    setLoading(true);
    try {
      const data = await fetchPropertiesWithPagination(nextPage);
      setProperties((prev) => [...prev, ...data.properties]);
      setTotalPages(data.total_pages);
      setNextPage(data.next_page);
    } catch (error) {
      console.error("Error loading more properties:", error);
    } finally {
      setLoading(false);
    }
  };

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
                <button onClick={toggleMyProperties}>
                  {showOnlyMyProperties
                    ? "Show All Properties"
                    : "Show My Properties"}
                </button>
              )}
            </li>
            <li>
              <button onClick={() => (window.location.href = "/bookings")}>
                My Bookings
              </button>
            </li>
          </ul>
        </div>
        <div>
          <div className="properties-container">
            {filteredProperties.map((property) => (
              <div key={property.id}>
                <a href={`/property/${property.id}`}>
                  <div
                    className="property-image"
                    style={{ backgroundImage: `url(${property.image_url})` }}
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
            ))}
          </div>
          {loading && <p>loading...</p>}
          {!loading && nextPage && (
            <div>
              <button onClick={loadMore}>See more</button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement("div"))
  );
});

export default Home;
