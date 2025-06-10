// Configuration for API requests
const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:10000/api"
    : "https://backborn-backend.onrender.com/api";

export { API_URL };