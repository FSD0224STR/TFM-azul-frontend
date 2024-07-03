const baseUrl = import.meta.env.VITE_BACKEND;

// const getAllUsers = async () => {
//   const response = await window.fetch(`${baseUrl}/users`);

//   if (!response.ok) {
//     const error = await response.json();
//     return { error: error.message };
//   }

//   const users = await response.json();
//   return { data: users };
// };

const addUser = async (firstname, lastname, username, password, email) => {
  const token = localStorage.getItem("access_token");

  const response = await fetch(`${baseUrl}/users/`, {
    method: "POST",
    body: JSON.stringify({ firstname, lastname, username, password, email }),
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorMessage = await response.json();
    return { error: errorMessage };
  }

  const newlyCreatedUser = await response.json();
  return { data: newlyCreatedUser };
};

const deleteUser = async (id) => {
  const token = localStorage.getItem("access_token");

  const response = await fetch(`${baseUrl}/users/${id}`, {
    method: "DELETE",
    headers: { authorization: `Bearer ${token}` },
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

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const logged = await response.json();
  return logged;
};

const getMyProfile = async (username) => {
  const token = localStorage.getItem("access_token");

  const response = await fetch(`${baseUrl}/users/${username}`, {
    method: "GET",
    headers: { authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const error = await response.json();
    return { error: error.message };
  }

  return { data: await response.json() };
};

const addNewImage = async (formData) => {
  console.log("formData", formData);

  const response = await fetch(`${baseUrl}/upload`, {
    method: "POST",
    body: formData,
    // headers: {
    //   "Content-Type": "multipart/form-data", //// Elimino del Encabezado Content-Type, ya que FormData gestiona este encabezado automáticamente.
    // },
  });

  if (!response.ok) {
    const error = await response.json();
    return { error: error.message };
  }

  return { data: await response.json() };
};

const updateUser = async (
  _id,
  firstname,
  lastname,
  username,
  email,
  imageUrl
) => {
  const token = localStorage.getItem("access_token");

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
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorMessage = await response.json();
    return { error: errorMessage };
  }

  const newlyCreatedUser = await response.json();
  return { data: newlyCreatedUser };
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

export default {
  /*getAllUsers,*/ addUser,
  deleteUser,
  login,
  getMyProfile,
  addNewImage,
  updateUser,
  forgotPassword,
  resetPassword,
};
