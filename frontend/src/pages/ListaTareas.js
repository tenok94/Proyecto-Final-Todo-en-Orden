import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { getTareas } from "../services/api";
import axios from "axios";
import AgregarTarea from "../components/AgregarTarea";

const ListaTareas = () => {
  const [tareas, setTareas] = useState([]);
  const [editando, setEditando] = useState(null);
  const [nuevaPrioridad, setNuevaPrioridad] = useState("");
  const [nuevoEstado, setNuevoEstado] = useState("");

  // Estado para el Snackbar (feedback visual)
  const [mensaje, setMensaje] = useState({ texto: "", tipo: "" });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const cargarTareas = () => {
    getTareas()
      .then((data) => setTareas(data))
      .catch(() => mostrarMensaje("Error al obtener las tareas", "error"));
  };

  useEffect(() => {
    cargarTareas();
  }, []);

  // Función para mostrar el feedback visual
  const mostrarMensaje = (texto, tipo) => {
    setMensaje({ texto, tipo });
    setOpenSnackbar(true);
  };

  const actualizarTarea = async (id) => {
    try {
      await axios.put(`http://localhost:3000/tareas/${id}`, {
        prioridad: nuevaPrioridad,
        estado: nuevoEstado,
      });
      mostrarMensaje("Tarea actualizada correctamente", "success");
      setEditando(null);
      cargarTareas();
    } catch (error) {
      mostrarMensaje("Error al actualizar la tarea", "error");
    }
  };

  const eliminarTarea = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/tareas/${id}`);
      mostrarMensaje("Tarea eliminada correctamente", "success");
      cargarTareas();
    } catch (error) {
      mostrarMensaje("Error al eliminar la tarea", "error");
    }
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Lista de Tareas
      </Typography>

      {/* Formulario para agregar tarea */}
      <AgregarTarea
        onTareaAgregada={() => {
          cargarTareas();
          mostrarMensaje("Tarea agregada correctamente", "success");
        }}
      />

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
                />
                <TextField
                  label="Nuevo Estado"
                  variant="outlined"
                  size="small"
                  value={nuevoEstado}
                  onChange={(e) => setNuevoEstado(e.target.value)}
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

      {/* Feedback visual con Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={mensaje.tipo}
          sx={{ width: "100%" }}
        >
          {mensaje.texto}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ListaTareas;
