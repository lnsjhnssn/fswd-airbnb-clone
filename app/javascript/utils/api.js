import { handleErrors, safeCredentials } from "./fetchHelper";

// *** Authentication *** //

// Check authentication status
export const checkAuthStatus = async () => {
  const response = await fetch("/api/authenticated");
  return handleErrors(response);
};

export const fetchAuthenticatedUser = async () => {
  const response = await fetch("/api/authenticated");
  return handleErrors(response);
};

export const checkAuth = async () => {
  const response = await fetch("/api/authenticated");
  return handleErrors(response);
};

// *** Users *** //

// Signup user
export const signupUser = async (userData) => {
  const response = await fetch(
    "/api/users",
    safeCredentials({
      method: "POST",
      body: JSON.stringify({
        user: userData,
      }),
    })
  );
  return handleErrors(response);
};
// Login user
export const loginUser = async (credentials) => {
  const response = await fetch(
    "/api/sessions",
    safeCredentials({
      method: "POST",
      body: JSON.stringify({
        user: credentials,
      }),
    })
  );
  return handleErrors(response);
};

// *** Properties *** //

// Create property
export const createProperty = async (propertyData) => {
  const response = await fetch(
    "/api/properties",
    safeCredentials({
      method: "POST",
      body: JSON.stringify({
        property: propertyData,
      }),
    })
  );

  const data = await handleErrors(response);
  return data;
};

// Update property by ID
export const updateProperty = async (propertyId, propertyData) => {
  const response = await fetch(
    `/api/properties/${propertyId}`,
    safeCredentials({
      method: "PUT",
      body: JSON.stringify({
        property: propertyData,
      }),
    })
  );
  const data = await handleErrors(response);
  return data;
};
// Fetch all properties
export const fetchProperties = async () => {
  const response = await fetch("/api/properties");
  const data = await handleErrors(response);
  return data.properties;
};

// Fetch all properties with pagination (for first page)
export const fetchPropertiesWithPagination = async (page = 1) => {
  const response = await fetch(`/api/properties?page=${page}`);
  const data = await handleErrors(response);
  return {
    properties: data.properties,
    total_pages: data.total_pages,
    next_page: data.next_page,
  };
};

//fetch property by ID
export const fetchProperty = async (propertyId) => {
  const response = await fetch(`/api/properties/${propertyId}`);
  return handleErrors(response);
};

// Fetch property bookings by ID
export const fetchPropertyBookings = async (propertyId) => {
  const response = await fetch(`/api/properties/${propertyId}/bookings`);
  return handleErrors(response);
};

// *** Bookings *** //

// Fetch bookings by property ID
export const fetchBookings = async (propertyId) => {
  const response = await fetch(`/api/properties/${propertyId}/bookings`);
  const data = await handleErrors(response);
  return {
    bookings: data.bookings.map((booking) => ({
      ...booking,
      start_date: booking.start_date,
      end_date: booking.end_date,
      user: {
        username: booking.user.username,
      },
    })),
  };
};

// Fetch user properties
export const fetchUserProperties = async () => {
  const response = await fetch("/api/properties");
  const data = await handleErrors(response);
  return data.properties;
};

// Fetch all property bookings
export const fetchAllPropertyBookings = async (properties) => {
  const bookingsPromises = properties.map((property) =>
    fetchPropertyBookings(property.id).then((data) => ({
      propertyId: property.id,
      bookings: data.bookings,
    }))
  );

  const bookingsResults = await Promise.all(bookingsPromises);
  const bookingsMap = {};
  bookingsResults.forEach((result) => {
    bookingsMap[result.propertyId] = result.bookings;
  });
  return bookingsMap;
};

// *** Sessions *** //
export const logoutUser = async () => {
  const response = await fetch(
    "/api/sessions/destroy",
    safeCredentials({
      method: "DELETE",
    })
  );
  return handleErrors(response);
};