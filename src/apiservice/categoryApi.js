const baseUrl =     import.meta.env.VITE_BACKEND+"/categories/";

const updateCategory = async (categoryId, updates) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return { error: "No token found. Please login again." };
  }
  try {
    const response = await fetch(`${baseUrl}${categoryId}`, {
      method: "PUT",
      body: JSON.stringify(updates),
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

const deleteCategory = async (categoryId) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return { error: "No token found. Please login again." };
  }

  const response = await fetch(`${baseUrl}${categoryId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    const error = await response.json();
    return { error: error.message };
  } 
  const data = await response.json();
  return { data };
};

const getCategoryInfo = async (categoryId) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return { error: "No token found. Please login again." };
  }

  try {
    const response = await fetch(`${baseUrl}${categoryId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return { error: error.message };
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    return { error: error.message };
  }
};

const getProposals = async (categoryId) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return { error: "No token found. Please login again." };
  }

  try {
    const response = await fetch(`${baseUrl}${categoryId}/proposals`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return { error: error.message };
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    return { error: error.message };
  }
};

const addProposal = async (categoryId, proposal) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return { error: "No token found. Please login again." };
  }

  try {
    const response = await fetch(`${baseUrl}${categoryId}`, {
      method: "POST",
      body: JSON.stringify(proposal),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return { error: error.message };
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    return { error: error.message };
  }
};

export default {
  updateCategory,
  deleteCategory,
  getCategoryInfo,
  getProposals,
  addProposal,
};
