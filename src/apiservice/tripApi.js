const baseUrl = "http://localhost:3000";

const getAllTrips = async () => {
  const response = await window.fetch(`${baseUrl}/users/trips`);

  if (!response.ok) {
    const error = await response.json();
    return { error: error.message };
  }

  const trips = await response.json();
  return { data: trips };
};

const addTrip = async (title) => {
  const token = localStorage.getItem("access_token");

  const response = await fetch(`${baseUrl}/users/trips/add`, {
    method: "POST",
    body: JSON.stringify({ title }),
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    return { error: error.message };
  }

  const newlyCreatedTrip = await response.json();
  return { data: newlyCreatedTrip };
};

const deleteTrip = async (id) => {
  const token = localStorage.getItem("access_token");

  const response = await fetch(`${baseUrl}/users/trips/${id}`, {
    method: "DELETE",
    headers: { authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const error = await response.json();
    return { error: error.message };
  }

  return { data: "ok, borrado" };
};

export default { getAllTrips, addTrip, deleteTrip };
