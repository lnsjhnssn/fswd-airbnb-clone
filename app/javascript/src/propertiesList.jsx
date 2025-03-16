import React from "react";

const PropertiesList = ({ properties, loading, loadMore, nextPage }) => {
  return (
    <div>
      <div className="properties-container">
        {properties.map((property) => {
          const {
            id,
            title,
            city,
            country,

            price_per_night,
            images = [],
          } = property;

          return (
            <div key={id} className="properties-front-page">
              <a href={`/property/${id}`}>
                <div className="img-property-list-container">
                  <img
                    src={images[0]?.url}
                    alt={title}
                    className="img-property-list"
                  />
                </div>
                <p className="location">
                  {city}, {country}
                </p>
                <h2 className="title">{title}</h2>
                <p className="price">${price_per_night} USD/night</p>
              </a>
            </div>
          );
        })}
      </div>
      {loading && <p>loading...</p>}
      {!loading && nextPage && (
        <div>
          <button onClick={loadMore}>See more</button>
        </div>
      )}
    </div>
  );
};

export default PropertiesList;
