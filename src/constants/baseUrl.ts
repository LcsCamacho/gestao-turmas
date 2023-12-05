const isProduction = process.env.NODE_ENV === "production";

export const BASE_URL_NEXT = isProduction
  ? "http://localhost:3000/api"
  : "http://localhost:3000/api";
