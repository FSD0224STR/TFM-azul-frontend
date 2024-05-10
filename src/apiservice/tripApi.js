const baseUrl = "http://localhost:3000";

const getAllTrips = async () => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return { error: "No token found. Please login again." };
  }

  const response = await fetch(`${baseUrl}/users/trips/`, {
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

const addTrip = async (title /*, start_date, end_date*/) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return { error: "No token found. Please login again." };
  }

  const response = await fetch(`${baseUrl}/users/trips/add`, {
    method: "POST",
    body: JSON.stringify({ title /*, start_date, end_date*/ }),
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
  const response = await fetch(`${baseUrl}/users/trips/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();
    return { error: error.message };
  }

  return { data: "ok, borrado" };
};

export default { getAllTrips, addTrip, deleteTrip };
