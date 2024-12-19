import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import axios from "axios";

const AgregarTarea = ({ onTareaAgregada }) => {
  const [tarea, setTarea] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [prioridad, setPrioridad] = useState("");
  const [estado, setEstado] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enviar la nueva tarea al backend
      await axios.post(process.env.REACT_APP_BASE_URL, {
        tarea,
        descripcion,
        prioridad,
        estado,
      });
      // Limpia el formulario
      setTarea("");
      setDescripcion("");
      setPrioridad("");
      setEstado("");

      // Notificar al padre que una tarea fue agregada
      onTareaAgregada();
    } catch (error) {
      console.error("Error al agregar tarea:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Agregar Nueva Tarea
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Tarea"
          variant="outlined"
          value={tarea}
          onChange={(e) => setTarea(e.target.value)}
          required
        />
        <TextField
          label="Descripción"
          variant="outlined"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />
        <TextField
          label="Prioridad"
          variant="outlined"
          value={prioridad}
          onChange={(e) => setPrioridad(e.target.value)}
          placeholder="Alta, Media o Baja"
          required
        />
        <TextField
          label="Estado"
          variant="outlined"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          placeholder="Pendiente, En Progreso o Completado"
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Agregar Tarea
        </Button>
      </Box>
    </Container>
  );
};

export default AgregarTarea;
