const baseUrl = import.meta.env.VITE_BACKEND + "/trips/";

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
    console.log("error", error.message);
    return { error: error.message };
  }
};

const getTripInfo = async (id) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return { error: "No token found. Please login again." };
  }

  try {
    const response = await fetch(`${baseUrl}${id}`, {
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

    const tripInfo = await response.json();
    return { data: tripInfo };
  } catch (error) {
    console.log("error", error.message);
    return { error: error.message };
  }
};

const addTrip = async (tripData) => {
  const token = localStorage.getItem("access_token");
  console.log("estoy en addTrip y esto es tripData: " + tripData);

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

// sólo puedo borrar si he creado el viaje
const updateTrip = async (id, tripData) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return { error: "No token found. Please login again." };
  }

  try {
    const response = await fetch(`${baseUrl}${id}`, {
      method: "PUT",
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

    return { data: "ok, actualizado" };
  } catch (error) {
    return { error: error.message };
  }
};

const addCategory = async (tripId, categoryData) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return { error: "No token found. Please login again." };
  }
  try {
    const response = await fetch(`${baseUrl}${tripId}`, {
      method: "POST",
      body: JSON.stringify(categoryData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return { error: error.message };
    }

    return { data: "ok, actualizado" };
  } catch (error) {
    return { error: error.message };
  }
};

const linkUserToTrip = async (tripId) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return { error: "No token found. Please login again." };
  }

  try {
    const response = await fetch(`${baseUrl}${tripId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return { error: error.message };
    }

    return `/join-trip/${tripId}`; // Devuelve la returnUrl correcta
  } catch (error) {
    return { error: error.message };
  }
};

const unlinkUserFromTrip = async (tripId, userId) => {
  const token = localStorage.getItem("access_token");

  try {
    const response = await fetch(`${baseUrl}/${tripId}/${userId}`, {
      method: "DELETE",
      headers: { authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return await response.json();
  } catch (error) {
    console.error("Error al desvincular al usuario del viaje:", error);
    return null;
  }
};

export default {
  getAllTrips,
  getTripInfo,
  addTrip,
  deleteTrip,
  updateTrip,
  addCategory,
  linkUserToTrip,
  unlinkUserFromTrip,
};
