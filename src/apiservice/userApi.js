const serverUrl = "http://localhost:3000";

export const login = async (username, password) => {
  const response = await fetch(`${serverUrl}/users/login`, {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) return { error: response.statusText };

  const token = await response.json();
  return { data: token };
};

export const homePage = async () => {
  const token = localStorage.getItem("access_token");

  const id = localStorage.getItem("id");

  const response = await fetch(`${serverUrl}/users/${id}`, {
    method: "GET",
    headers: { authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const error = await response.json();
    return { error: error.message };
  }

  const myInfoPage = await response.json();
  return { data: myInfoPage };
};

export const createUser = async (
  firstname,
  lastname,
  username,
  password,
  email
) => {
  const token = localStorage.getItem("access_token");

  const response = await fetch(`${serverUrl}/users/register`, {
    method: "POST",
    body: JSON.stringify({ firstname, lastname, username, password, email }),
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const error = await response.json();
    return { error: error.message };
  }

  const newlyCreatedUser = await response.json();
  return { data: newlyCreatedUser };
};

export const deleteUser = async (id) => {
  const token = localStorage.getItem("access_token");

  const response = await fetch(`${serverUrl}/users/${id}`, {
    method: "DELETE",
    headers: { authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const error = await response.json();
    return { error: error.message };
  }

  return { data: "ok, borrado" };
};
