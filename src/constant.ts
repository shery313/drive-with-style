const fallbackApiUrl = import.meta.env.DEV
  ? "http://127.0.0.1:8000"
  : "https://drivewithstyle.up.railway.app";

export const SERVER_URL: string = (
  import.meta.env.VITE_API_BASE_URL?.trim() || fallbackApiUrl
).replace(/\/+$/, "");
