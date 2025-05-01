"use strict";

const API_BASE_URL = "http://localhost:8000/api";

export default async function apiFetch(
  url,
  method = "GET",
  body = null,
  setError = null
) {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${API_BASE_URL}/${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: body ? JSON.stringify(body) : null,
    });

    const data = await res.json();

    if (!res.ok) {
      const firstError =
        Object.values(data.errors || [])[0] ||
        data.message ||
        "Une erreur est survenue.";
      if (setError) setError(firstError);
      throw new Error(firstError);
    }

    if (setError) setError(null); 

    return data;
  } catch (error) {
    if (setError) setError(error.message);
    console.error(error);
    
    throw error; 
  }
}
