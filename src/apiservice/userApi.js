const baseUrl = import.meta.env.VITE_BACKEND;

const getAuthToken = () => localStorage.getItem("access_token");

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    return { error: data.message || "Error en la solicitud" };
  }
  return { data };
};

const addUser = async (firstname, lastname, username, password, email) => {
  const token = getAuthToken();
  const response = await fetch(`${baseUrl}/users/`, {
    method: "POST",
    body: JSON.stringify({ firstname, lastname, username, password, email }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return handleResponse(response);
};

const deleteUser = async (id) => {
  const token = getAuthToken();
  const response = await fetch(`${baseUrl}/users/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const error = await response.json();
    return { error: error.message };
  }

  return { data: "ok, borrado" };
};

const login = async (username, password) => {
  const response = await fetch(`${baseUrl}/users/login`, {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: { "Content-Type": "application/json" },
  });

  return handleResponse(response);
};

const getMyProfile = async (username) => {
  const token = getAuthToken();
  const response = await fetch(`${baseUrl}/users/${username}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  return handleResponse(response);
};

const addNewImage = async (formData) => {
  const response = await fetch(`${baseUrl}/upload`, {
    method: "POST",
    body: formData,
  });

  return handleResponse(response);
};

const updateUser = async (
  _id,
  firstname,
  lastname,
  username,
  email,
  imageUrl
) => {
  const token = getAuthToken();
  const response = await fetch(`${baseUrl}/users/${_id}`, {
    method: "PUT",
    body: JSON.stringify({
      _id,
      firstname,
      lastname,
      username,
      email,
      imageUrl,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return handleResponse(response);
};

const forgotPassword = async (email) => {
  const response = await fetch(`${baseUrl}/users/forgot-password`, {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const error = await response.json();
    return { error: error.message };
  }

  const result = await response.json();
  return { data: result };
};

const resetPassword = async (token, newPassword) => {
  const response = await fetch(`${baseUrl}/users/reset-password`, {
    method: "POST",
    body: JSON.stringify({ token, newPassword }),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const error = await response.json();
    return { error: error.message };
  }

  const result = await response.json();
  return { data: result };
};
const getUserByToken = async (token) => {
  const response = await fetch(`${baseUrl}/users/${token}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  return handleResponse(response);
};

export const verifyUserAccount = async (token) => {
  const response = await fetch(`${baseUrl}/users/verify-user`, {
    method: "PATCH",
    body: JSON.stringify({ token }),
    headers: { "Content-Type": "application/json" },
  });

  return handleResponse(response);
};

export default {
  addUser,
  deleteUser,
  login,
  getMyProfile,
  addNewImage,
  updateUser,
  forgotPassword,
  resetPassword,
  getUserByToken,
  verifyUserAccount,
};
