const baseUrl = import.meta.env.VITE_BACKEND+"/proposals/";

const updateProposal = async (proposalId, updates) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return { error: "No token found. Please login again." };
  }
  try {
    const response = await fetch(`${baseUrl}${proposalId}`, {
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

const deleteProposal = async (proposalId) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return { error: "No token found. Please login again." };
  }

  const response = await fetch(`${baseUrl}${proposalId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok)  {
    const error = await response.json();
    return { error: error.message };
  } 
  const data = await response.json();
  return { data };
};

const getProposalInfo = async (proposalId) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return { error: "No token found. Please login again." };
  }

  try {
    const response = await fetch(`${baseUrl}${proposalId}`, {
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

export default {
  updateProposal,
  deleteProposal,
  getProposalInfo,
};
