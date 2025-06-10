// Configuration for API requests
const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:10000/api"
    : "https://your-production-domain.com/api";

export { API_URL };