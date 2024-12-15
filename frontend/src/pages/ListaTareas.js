import React, { useEffect, useState } from "react";
import { Container, Typography, List, ListItem, ListItemText, Button, TextField, Box} from "@mui/material";
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

  // Función para actualizar una tarea
  const actualizarTarea = async (id) => {
    try {
      await axios.put(`http://localhost:3000/tareas/${id}`, {
        prioridad: nuevaPrioridad,
        estado: nuevoEstado,
      });
      setEditando(null);
      cargarTareas();
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
    }
  };

  // Función para eliminar una tarea
  const eliminarTarea = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/tareas/${id}`);
      cargarTareas(); // Recargar la lista después de eliminar
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
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
            {editando === tarea._id ? (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <TextField
                  label="Nueva Prioridad"
                  variant="outlined"
                  size="small"
                  value={nuevaPrioridad}
                  onChange={(e) => setNuevaPrioridad(e.target.value)}
                  placeholder="Alta, Media o Baja"
                />
                <TextField
                  label="Nuevo Estado"
                  variant="outlined"
                  size="small"
                  value={nuevoEstado}
                  onChange={(e) => setNuevoEstado(e.target.value)}
                  placeholder="Pendiente, En Progreso, Completado"
                />
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => actualizarTarea(tarea._id)}
                  >
                    Guardar
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => setEditando(null)}
                  >
                    Cancelar
                  </Button>
                </Box>
              </Box>
            ) : (
              <>
                <ListItemText
                  primary={`Tarea: ${tarea.tarea}`}
                  secondary={`Prioridad: ${tarea.prioridad} | Estado: ${tarea.estado}`}
                />
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setEditando(tarea._id);
                      setNuevaPrioridad(tarea.prioridad);
                      setNuevoEstado(tarea.estado);
                    }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => eliminarTarea(tarea._id)}
                  >
                    Eliminar
                  </Button>
                </Box>
              </>
            )}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ListaTareas;

