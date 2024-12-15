import React, { useEffect, useState } from "react";
import { Container, Typography, List, ListItem, ListItemText, Button, TextField, Box } from "@mui/material";
import { getTareas } from "../services/api";
import axios from "axios";
import AgregarTarea from "../components/AgregarTarea";

const ListaTareas = () => {
  const [tareas, setTareas] = useState([]);
  const [editando, setEditando] = useState(null); 
  const [nuevaPrioridad, setNuevaPrioridad] = useState("");
  const [nuevoEstado, setNuevoEstado] = useState("");

  const cargarTareas = () => {
    getTareas()
      .then((data) => setTareas(data))
      .catch((error) => console.error("Error al obtener tareas:", error));
  };

  useEffect(() => {
    cargarTareas();
  }, []);

  //actualizar la tarea
  const actualizarTarea = async (id) => {
    try {
      await axios.put(`http://localhost:3000/tareas/${id}`, {
        prioridad: nuevaPrioridad,
        estado: nuevoEstado,
      });
      setEditando(null); // Salir del modo edición
      cargarTareas(); // Recargar la lista
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Lista de Tareas
      </Typography>

      {/* Formulario para agregar tarea */}
      <AgregarTarea onTareaAgregada={cargarTareas} />

      {/* Lista de tareas */}
      <List>
        {tareas.map((tarea) => (
          <ListItem key={tarea._id} divider>
            <ListItemText
              primary={`Tarea: ${tarea.tarea}`}
              secondary={`Prioridad: ${tarea.prioridad} | Estado: ${tarea.estado}`}
            />

            {/* Botón de edición */}
            {editando === tarea._id ? (
              <Box sx={{ display: "flex", gap: 1 }}>
                <TextField
                  label="Nueva Prioridad"
                  variant="outlined"
                  size="small"
                  value={nuevaPrioridad}
                  onChange={(e) => setNuevaPrioridad(e.target.value)}
                  placeholder="Alta, Media, Baja"
                />
                <TextField
                  label="Nuevo Estado"
                  variant="outlined"
                  size="small"
                  value={nuevoEstado}
                  onChange={(e) => setNuevoEstado(e.target.value)}
                  placeholder="Pendiente, En Progreso, Completado"
                />
                <Button variant="contained" color="primary" onClick={() => actualizarTarea(tarea._id)}>
                  Guardar
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => setEditando(null)}>
                  Cancelar
                </Button>
              </Box>
            ) : (
              <Button variant="contained" onClick={() => setEditando(tarea._id)}>
                Editar
              </Button>
            )}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ListaTareas;


