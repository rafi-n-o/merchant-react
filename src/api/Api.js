import axios from "axios";

const Api = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "https://retail-service.kemiskejetkeun.com",
});

export default Api;
