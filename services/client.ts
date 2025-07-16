import https from "https";
import axios from "axios";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  httpsAgent: httpsAgent,
  withCredentials: true,
});

export default apiClient;
