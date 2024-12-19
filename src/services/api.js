import axios from "axios";

const api = axios.create({
  baseURL: REACT_APP_BASE_URL, 
});

export const getTareas = async () => {
  const response = await api.get("/tareas");
  return response.data;
};

export default api;
