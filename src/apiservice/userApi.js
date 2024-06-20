const baseUrl = "http://localhost:3000";

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
    return { error: error.message };
  }
  const logged = await response.json();
  return { data: logged };
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

export default { /*getAllUsers,*/ addUser, deleteUser, login, getMyProfile };
