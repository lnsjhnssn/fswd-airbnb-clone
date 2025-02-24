import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Layout from "@src/layout";
import {
  fetchAuthenticatedUser,
  fetchPropertiesWithPagination,
} from "../utils/api";
import PropertiesList from "./propertiesList";

import "@src/styles/main.scss";

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const propertyData = await fetchPropertiesWithPagination(1);
        setProperties(propertyData.properties);
        setTotalPages(propertyData.total_pages);
        setNextPage(propertyData.next_page);
        console.log(propertyData);

        try {
          const userData = await fetchAuthenticatedUser();
          setCurrentUserId(userData.user_id);
        } catch (error) {
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

  return (
    <Layout>
      <div>
        <div>
          <PropertiesList properties={properties} />
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
