import axios from "axios";

export const api = axios.create({
  baseURL: "https://poseidonpayments-production-b501.up.railway.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});
