const baseUrl = "http://localhost:3000/trips/";

const getAllTrips = async () => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return { error: "No token found. Please login again." };
  }

  try {
    const response = await fetch(`${baseUrl}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return { error: error.message };
    }

    const trips = await response.json();
    return { data: trips };
  } catch (error) {
    return { error: error.message };
  }
};

const addTrip = async (tripData) => {
  const token = localStorage.getItem("access_token");
  console.log('tripData: ' + tripData);

  if (!token) {
    return { error: "No token found. Please login again." };
  }

  try {
    const response = await fetch(`${baseUrl}`, {
      method: "POST",
      body: JSON.stringify(tripData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return { error: error.message };
    }

    const newlyCreatedTrip = await response.json();
    return { data: newlyCreatedTrip };
  } catch (error) {
    return { error: error.message };
  }
};

// sólo puedo borrar si he creado el viaje
const deleteTrip = async (id) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return { error: "No token found. Please login again." };
  }

  try {
    const response = await fetch(`${baseUrl}${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return { error: error.message };
    }

    return { data: "ok, borrado" };
  } catch (error) {
    return { error: error.message };
  }
};

export default { getAllTrips, addTrip, deleteTrip };
