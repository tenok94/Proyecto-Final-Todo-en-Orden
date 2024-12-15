import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", 
});

export const getTareas = async () => {
  const response = await api.get("/tareas");
  return response.data;
};

export default api;
