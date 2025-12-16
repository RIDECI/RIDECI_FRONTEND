import axios from "axios";

export const api = axios.create({
  baseURL: "/api/payments",
  headers: {
    "Content-Type": "application/json",
  },
});
