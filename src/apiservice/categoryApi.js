const baseUrl = "http://localhost:3000/categories/";

const updateCategory = async (categoryId, updates) => {

    const token = localStorage.getItem("access_token");

    if (!token) {
    return { error: "No token found. Please login again." };
    }
try {
    const response = await fetch(`${baseUrl}${categoryId}`, {
        method: "PUT",
        body: JSON.stringify(updates ),
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
        },
        });

        if (!response.ok) {
            const error = await response.json();
            return { error: error.message };
        }

        return {data: "ok, actualizado"}
} catch (error) {
    return { error: error.message };
}

};

export default {updateCategory};