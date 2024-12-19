import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_BASE_URL + "/tareas";//"http://localhost:3000/tareas"; // URL del backend

// Thunk para obtener las tareas
export const fetchTareas = createAsyncThunk("tareas/fetchTareas", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

// Thunk para editar una tarea
export const updateTarea = createAsyncThunk(
  "tareas/updateTarea",
  async ({ id, tareaActualizada }) => {
    const response = await axios.put(`${API_URL}/${id}`, tareaActualizada);
    return response.data;
  }
);


// Thunk para eliminar una tarea
export const deleteTarea = createAsyncThunk("tareas/deleteTarea", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const tasksSlice = createSlice({
  name: "tareas",
  initialState: { tareas: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Obtener tareas
      .addCase(fetchTareas.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTareas.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tareas = action.payload;
      })
      .addCase(fetchTareas.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Eliminar tarea
      .addCase(deleteTarea.fulfilled, (state, action) => {
        state.tareas = state.tareas.filter((tarea) => tarea._id !== action.payload);
      });
  },
});

export default tasksSlice.reducer;
