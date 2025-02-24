import {
  handleErrors,
  safeCredentials,
  safeCredentialsForm,
} from "./fetchHelper";

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

// *** Users *** //

// Signup user
export const signupUser = async (userData) => {
  const response = await fetch(
    "/api/users",
    safeCredentialsForm({
      method: "POST",
      body: JSON.stringify({
        user: userData,
      }),
    })
  );
  return handleErrors(response);
};

// *** Properties *** //

// Create property
export const createProperty = async (formData) => {
  const response = await fetch(
    "/api/properties",
    safeCredentialsForm({
      method: "POST",
      body: formData,
    })
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Error: ${errorData.error || "Unknown error"}`);
  }

  return response.json();
};

// Create property with images
export const createPropertyWithImages = async (propertyData) => {
  const response = await fetch(
    "/api/properties",
    safeCredentialsForm({
      method: "POST",
      body: FormData,
    })
  );

  const data = await handleErrors(response);
  return data;
};

// Update property by ID
export const updateProperty = async (propertyId, formData) => {
  const response = await fetch(
    `/api/properties/${propertyId}`,
    safeCredentialsForm({
      method: "PUT",
      body: formData,
    })
  );
  const data = await handleErrors(response);
  return data;
};

export const deleteProperty = async (propertyId) => {
  const response = await fetch(
    `/api/properties/${propertyId}`,
    safeCredentials({
      method: "DELETE",
    })
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Error: ${errorData.error || "Unknown error"}`);
  }

  return response.json();
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

// Fetch user's bookings (authenticated by session token -> bookings_controller.rb)
export const fetchMyBookings = async () => {
  const response = await fetch("/api/bookings/my_bookings");
  return handleErrors(response);
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
