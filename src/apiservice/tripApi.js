const baseUrl = "http://localhost:3000" + "/users/trips/";

const getAllTrips = async () => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return { error: "No token found. Please login again." };
  }

  const response = await fetch(`${baseUrl}`, {
    method: "GET",
    body: JSON.stringify(),
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
};

const addTrip = async (tripData) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return { error: "No token found. Please login again." };
  }

  const response = await fetch(`${baseUrl}add`, {
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
};

//sólo puedo borrar si he creado el viaje?
const deleteTrip = async (id) => {
  const response = await fetch(`${baseUrl}${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();
    return { error: error.message };
  }

  return { data: "ok, borrado" };
};

export default { getAllTrips, addTrip, deleteTrip };
